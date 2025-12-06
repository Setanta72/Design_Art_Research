---
layout: post
title: "Building ObsLite: A Lightweight Obsidian Alternative for Raspberry Pi"
date: 2025-12-06
categories: [development, rust, tauri, markdown]
tags: [obsidian, markdown, raspberry-pi, tauri, svelte, rust]
author: Setanta
---

# Building ObsLite: A Lightweight Obsidian Alternative

ObsLite is a lightweight markdown note-taking application inspired by Obsidian, designed to run efficiently on resource-constrained devices like the Raspberry Pi 5. This post documents the development decisions, architecture, and installation process.

## Project Goals

The primary motivation was to create a note-taking app that:

- Runs smoothly on a Raspberry Pi 5 accessed via VNC
- Supports wiki-style `[[linking]]` between notes
- Provides backlinks to see which notes reference the current note
- Includes full-text search and tag support
- Offers a formatting toolbar for convenient editing across different keyboards
- Uses a flat folder of `.md` files (like Obsidian vaults)

## Technology Stack Decisions

### Framework: Tauri 2.x

**Why Tauri over Electron?**

Tauri was chosen for its significantly smaller binary size and lower memory footprint—critical factors for Raspberry Pi deployment. While native GTK or Qt would offer even better performance, Tauri provides a good balance between development speed and runtime efficiency.

| Consideration | Tauri | Electron |
|---------------|-------|----------|
| Binary size | ~5MB | ~150MB+ |
| Memory usage | Lower | Higher |
| Development speed | Fast | Fast |
| Cross-platform | Yes | Yes |

### Frontend: Svelte + SvelteKit

Svelte compiles to vanilla JavaScript with minimal runtime overhead, making it ideal for performance-sensitive applications. The reactive store system provides clean state management without additional libraries.

### Editor: CodeMirror 6

CodeMirror 6 was selected for its:

- Modular architecture allowing custom extensions
- Excellent performance with large documents
- Built-in support for markdown syntax highlighting
- Extensible autocomplete system (used for `[[wiki-link]]` suggestions)

### Markdown Rendering: marked

The `marked` library provides fast markdown-to-HTML conversion with support for GitHub Flavored Markdown extensions.

### Backend: Rust

Rust handles all file system operations, search indexing, and link analysis. Key benefits:

- Memory safety without garbage collection
- Excellent performance for file traversal and text search
- Native integration with Tauri

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Svelte Frontend                       │
├─────────────┬─────────────┬─────────────┬───────────────┤
│   Sidebar   │   Editor    │   Preview   │  Right Panel  │
│  (files)    │ (CodeMirror)│  (marked)   │ (tags/links)  │
└─────────────┴─────────────┴─────────────┴───────────────┘
                           │
                    Tauri IPC Bridge
                           │
┌─────────────────────────────────────────────────────────┐
│                    Rust Backend                          │
├─────────────────┬─────────────────┬─────────────────────┤
│   vault.rs      │   search.rs     │     links.rs        │
│ (file ops)      │ (full-text)     │ (wiki-links)        │
└─────────────────┴─────────────────┴─────────────────────┘
```

## Primary Components

### Rust Backend Modules

#### `vault.rs` - File Operations

Handles all markdown file operations within the vault:

```rust
// Core functions
pub fn list_markdown_files(vault_path: &Path) -> Result<Vec<NoteFile>, String>
pub fn read_file(vault_path: &Path, relative_path: &str) -> Result<String, String>
pub fn save_file(vault_path: &Path, relative_path: &str, content: &str) -> Result<(), String>
pub fn create_file(vault_path: &Path, name: &str) -> Result<NoteFile, String>
pub fn delete_file(vault_path: &Path, relative_path: &str) -> Result<(), String>
pub fn rename_file(vault_path: &Path, old_path: &str, new_name: &str) -> Result<NoteFile, String>
```

Uses `walkdir` for recursive directory traversal and includes filename sanitization to prevent path traversal attacks.

#### `search.rs` - Full-Text Search

Implements content search and tag extraction:

```rust
pub fn search_files(vault_path: &Path, query: &str) -> Result<Vec<SearchResult>, String>
pub fn search_by_tag(vault_path: &Path, tag: &str) -> Result<Vec<NoteFile>, String>
pub fn get_all_tags(vault_path: &Path) -> Result<Vec<String>, String>
pub fn extract_tags(content: &str) -> Vec<String>
```

Tags are extracted using regex pattern matching for `#tag` syntax, excluding those within code blocks.

#### `links.rs` - Wiki-Link Analysis

Parses `[[wiki-links]]` and builds the backlink graph:

```rust
pub fn get_link_info(vault_path: &Path, relative_path: &str) -> Result<LinkInfo, String>
pub fn extract_wiki_links(content: &str) -> Vec<String>
fn find_backlinks(vault_path: &Path, note_name: &str) -> Result<Vec<NoteFile>, String>
```

Supports both `[[NoteName]]` and `[[NoteName|Display Text]]` syntax.

### Svelte Components

| Component | Purpose |
|-----------|---------|
| `Sidebar.svelte` | File list with search filter, new note creation |
| `Editor.svelte` | CodeMirror 6 markdown editor with wiki-link autocomplete |
| `Preview.svelte` | Rendered markdown with clickable wiki-links and tags |
| `Toolbar.svelte` | Formatting buttons (bold, italic, headings, lists, etc.) |
| `TagsPane.svelte` | Displays all tags in vault with click-to-filter |
| `SearchPane.svelte` | Full-text search interface with result previews |
| `BacklinksPane.svelte` | Shows incoming and outgoing links for current note |

### State Management

Application state is managed through Svelte stores in `stores/app.ts`:

```typescript
export const vaultPath = writable<string | null>(null);
export const notes = writable<NoteFile[]>([]);
export const currentNote = writable<NoteFile | null>(null);
export const currentContent = writable<string>('');
export const isEditing = writable<boolean>(true);
export const allTags = writable<string[]>([]);
export const linkInfo = writable<LinkInfo | null>(null);
```

## Key Features Implementation

### Wiki-Link Autocomplete

The editor provides autocomplete suggestions when typing `[[`:

1. Detects `[[` trigger pattern
2. Fetches all note names from backend
3. Filters based on typed characters
4. Inserts selected note name with closing `]]`

### Auto-Create Notes

When clicking a wiki-link to a non-existent note:

1. Frontend detects the link target doesn't exist
2. Calls `create_note` backend command
3. Opens the newly created note for editing

### Backlink Discovery

On note load, the backend scans all vault files for references:

1. Extracts current note's name
2. Searches all `.md` files for `[[NoteName` pattern (case-insensitive)
3. Returns list of linking notes

## Installation Guide

### Prerequisites (All Platforms)

- Node.js 18+ and npm
- Rust toolchain (rustup)
- Git

### Raspberry Pi (Debian/Ubuntu-based)

```bash
# Install system dependencies
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl \
  wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Clone and build
git clone https://github.com/Setanta72/ObsLite.git
cd ObsLite
npm install
npm run tauri build

# Install the .deb package
sudo dpkg -i src-tauri/target/release/bundle/deb/obslite_*.deb
```

**Important: WebKit Rendering Fix for Pi**

When running on Raspberry Pi (especially via VNC), you may encounter rendering issues. Launch with these environment variables:

```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 WEBKIT_DISABLE_COMPOSITING_MODE=1 obslite
```

Or use the included launcher script:

```bash
./obslite.sh
```

### Fedora

```bash
# Install system dependencies
sudo dnf install -y webkit2gtk4.1-devel openssl-devel curl wget \
  file libxdo-devel librsvg2-devel

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Clone and build
git clone https://github.com/Setanta72/ObsLite.git
cd ObsLite
npm install
npm run tauri build

# Install the RPM package
sudo rpm -i src-tauri/target/release/bundle/rpm/obslite-*.rpm
```

### macOS

```bash
# Install Xcode Command Line Tools (if not already installed)
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Clone and build
git clone https://github.com/Setanta72/ObsLite.git
cd ObsLite
npm install
npm run tauri build

# The .dmg will be in:
# src-tauri/target/release/bundle/dmg/ObsLite_*.dmg
```

Open the `.dmg` and drag ObsLite to your Applications folder.

## Running the Application

1. Launch ObsLite from your applications menu or command line
2. Click "Select Vault Folder" to choose your notes directory
3. Create new notes with the "+" button in the sidebar
4. Use `[[` to link between notes with autocomplete
5. Toggle between edit and preview modes with the eye icon
6. Use the formatting toolbar for quick markdown insertion

## Project Structure

```
ObsLite/
├── src/                    # Svelte frontend
│   ├── lib/
│   │   ├── components/     # UI components
│   │   ├── stores/         # Svelte stores
│   │   └── api.ts          # Tauri command wrappers
│   └── routes/
│       └── +page.svelte    # Main application page
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── lib.rs          # Tauri commands
│   │   ├── vault.rs        # File operations
│   │   ├── search.rs       # Search functionality
│   │   └── links.rs        # Wiki-link handling
│   ├── capabilities/       # Tauri permissions
│   └── Cargo.toml          # Rust dependencies
├── package.json            # Node dependencies
└── obslite.sh              # Launcher script (Linux)
```

## Future Development

The v1.0 release provides core functionality. Planned enhancements for v2.0 include:

- Live preview (WYSIWYG-style editing)
- Graph view for visualizing note connections
- Vim keybindings
- Plugin system
- Mobile companion app
- Sync between devices

## Conclusion

ObsLite demonstrates that a capable note-taking application can run efficiently on modest hardware like the Raspberry Pi. By choosing Tauri over Electron and Svelte over heavier frameworks, we achieved a responsive application with a ~5MB binary size.

The source code is available at [github.com/Setanta72/ObsLite](https://github.com/Setanta72/ObsLite) under the MIT license.

---

*Built with Claude Code assistance*
