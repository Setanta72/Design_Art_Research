---
layout: post
title: "From Lost Account to Live Site: A GitHub & Jekyll Recovery Journey"
date: 2025-05-06 22:30:00 +0100
categories: [github, jekyll, git, tutorial, recovery]
author: "Brian P. Casey (with a little help from a friendly AI)"
---

It's a situation many of us dread: losing access to a critical online account. In my case, it was an old GitHub account hosting my `Design_Art_Research` project, complete with a Jekyll-powered GitHub Pages site. With the original email address gone, recovery was impossible. But, armed with local copies of my code and a bit of determination, it was time to rebuild and get back online. This post chronicles that journey.

## Laying the New Foundation: A Fresh Start

The first order of business was clear: a new GitHub identity.

1.  **New GitHub Account:** I created a new account, settling on the username `Setanta72`.
2.  **Git Installation & Configuration:** Although Git was operational on my Mac  (and I have a Fedora Mini PC too), it was a good time to ensure it was up-to-date and configured with my new identity:
    ```bash
    git config --global user.name "your.name" # Or your preferred name
    git config --global user.email "your.new.email@example.com" # Associated with Setanta72
    ```

## The First Hurdle: Connecting to GitHub (The SSH Saga)

With a new account ready, the next step was to get my local `Design_Art_Research` project connected. I opted for SSH for its security and convenience, which led to a bit of a deep dive.

1.  **Generating SSH Keys:** On my Mac, I generated a new ED25519 SSH key pair:
    ```bash
    ssh-keygen -t ed25519 -C "your.new.email@example.com"
    ```
2.  **Adding Public Key to GitHub:** The public key (`~/.ssh/id_ed25519.pub`) was dutifully copied and added to the SSH keys section of my `Setanta72` GitHub account settings.
3.  **The Infamous `Permission denied (publickey)`:** My initial attempts to interact with a new (empty) repository for `Design_Art_Research` on GitHub were met with this dreaded error. This meant troubleshooting:
    * Verifying the key was indeed on GitHub.
    * Ensuring `ssh-agent` was running (`eval "$(ssh-agent -s)"`) and had the key loaded (`ssh-add ~/.ssh/id_ed25519`).
    * The breakthrough test: `ssh -T git@github.com`. Once this returned a success message ("Hi Setanta72! You've successfully authenticated..."), I knew the SSH connection itself was sound.

## Code Resurrected: Pushing the Local Repository

Before the initial push, my local `Design_Art_Research` repository needed a quick cleanup. `git status` revealed some tracked macOS `.DS_Store` files and editor backup files (`*~`).

1.  **`.gitignore` to the Rescue:** I created/updated the `.gitignore` file in the project root:
    ```gitignore
    .DS_Store
    *~
    # Add other OS-specific or build artifact patterns as needed
    ```
2.  **Cleaning Up Tracked Files:** For files like `.DS_Store` that were already tracked, I used `git rm --cached <file>` to remove them from Git's tracking without deleting them locally. The deletions of the `*~` files were also staged.
3.  **Committing the Cleanup:**
    ```bash
    git add .gitignore .DS_Store _posts/.DS_Store # and other affected files
    git commit -m "Clean up .DS_Store and editor backup files, update .gitignore"
    ```
4.  **Pointing to the New Remote:**
    * An empty repository named `Design_Art_Research` was created on my `Setanta72` GitHub account.
    * Locally, I updated the remote URL:
        ```bash
        # First, check existing remote: git remote -v
        # Then, either remove and add, or set-url:
        git remote set-url origin git@github.com:Setanta72/Design_Art_Research.git
        ```
5.  **The Satisfying Push:** With everything in place:
    ```bash
    git push -u origin main
    ```
    Success! The code, along with its history, was now safely on GitHub under my new account.

## Bringing the Site Back: Jekyll and GitHub Pages

My `Design_Art_Research` repository was originally a Jekyll site served via GitHub Pages. Restoring this functionality was paramount.

1.  **GitHub Pages Configuration:**
    * In the `Setanta72/Design_Art_Research` repository settings on GitHub, under "Pages".
    * Source set to "Deploy from a branch".
    * Branch set to `main` and folder to `/ (root)`.
2.  **The Crucial `_config.yml`:** This file needed careful review, especially:
    * `url: "https://setanta72.github.io"`
    * `baseurl: "/Design_Art_Research"` (Absolutely critical for project sites so that assets and links resolve correctly).
    After committing and pushing any necessary changes to `_config.yml`, GitHub Actions automatically built and deployed the site.
3.  **Victory!** The site was live once more at `https://setanta72.github.io/Design_Art_Research/`.

## Smooth Sailing Ahead: Content Updates and Convenience

With the site restored, managing new content and optimizing workflow became the focus.

1.  **Standard Git Workflow for New Posts:** When adding a new file (e.g., a blog post in `_posts/`):
    1.  Create the file locally.
    2.  `git status` (to see the new untracked file).
    3.  `git add _posts/your-new-post.md`
    4.  `git commit -m "Added new post: Title of Post"`
    5.  `git push`
    This ensures new content is committed locally, then pushed to GitHub to trigger a site rebuild.

2.  **Making Life Easier: Touch ID for SSH Passphrases (macOS):**
    Being prompted for my SSH key passphrase every time was, frankly, "a pain in the arse." The solution on macOS involved configuring `~/.ssh/config`:
    ```ssh-config
    Host *
      AddKeysToAgent yes
      UseKeychain yes
      IdentityFile ~/.ssh/id_ed25519 # Or your specific key
    ```
    After adding this, running `ssh-add ~/.ssh/id_ed25519` prompted for the passphrase one last time, storing it in the macOS Keychain. Subsequent SSH operations now conveniently prompt for Touch ID.

## Conclusion

What started as a frustrating loss of access turned into a valuable opportunity to rebuild, clean up, and streamline. My `Design_Art_Research` project is back on GitHub, the Jekyll site is live, and my workflow is more secure and convenient than before. It's a testament to the power of local backups, version control, and a bit of systematic troubleshooting!

Hopefully, this chronicle helps others who might find themselves in a similar predicament or are just looking to fine-tune their Git and GitHub Pages setup.
---