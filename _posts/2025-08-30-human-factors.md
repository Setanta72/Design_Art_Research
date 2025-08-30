---
layout: post
title: "Human Factors"
date: 2025-08-30T13:21:12.343Z
---

# Troubleshooting Log

This document summarizes the steps taken to resolve issues with the Jekyll Post Editor application.

## 1. SSH Key Authentication Error

*   **Problem:** When attempting to sync the `setanta.github.io` repository, a `git@github.com: Permission denied (publickey)` error occurred.
*   **Cause:** The SSH key used for GitHub authentication was not set up correctly.
*   **Resolution:**
    1.  Generated a new SSH key.
    2.  Added the new SSH key to the GitHub account.
    3.  Successfully synced the repository manually using `git pull`.

## 2. Application Fails to Start

*   **Problem:** The application would not start and threw a `TypeError: Store is not a constructor` error in the main process.
*   **Cause:** The version of `electron-store` being used is an ESM-only module and cannot be imported with `require()` in a CommonJS file.
*   **Resolution:**
    1.  Modified `main.js` to use a dynamic `import()` to load `electron-store` asynchronously.
    2.  The store initialization was moved to an `async` function that is called when the application is ready.

## 3. Missing "Post" Button and Repository Setup Issue

*   **Problem:** After fixing the startup error, the application would launch, but the "Post" button was missing, and it seemed to have issues setting up the repository directory.
*   **Cause:** A race condition was identified where the renderer process (`renderer.js`) was checking for the repository path before the main process (`main.js`) had finished initializing it.
*   **Resolution:**
    1.  Implemented an IPC signal (`repo-ready`) from the main process to the renderer process.
    2.  The main process now sends this signal after the repository path has been successfully loaded.
    3.  The renderer process now waits for this signal before checking for the repository path and enabling the "Post" button.
