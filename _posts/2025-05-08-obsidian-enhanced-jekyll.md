---
layout: post
title: "Untitled 1"
date: 2025-05-08 21:16:13 +0100+0100 # Generates date, time, and timezone offset (e.g., +01:00)
categories: [blog,process]
tags: [AI, blog, obsidian]
author: "Brian P. Casey" # Or your preferred author name
published: true # Set to false to keep it as a draft
---

## Obsidian Jekyll Template
I have updated my Jekyll template in Obsidian to automatically fire up when I generate a new blog post in the "Blog" directory and in its start up of a new post call for a Jekyll compatible tithe and prompt for categories and tags.

The next steps are to replicate this level of automation for my WordPress within obsidian. Currently using Ulysses. 

Also think about watching the blog directory for changes and automatically copying those changes across to the GitHub directory 

---

Below is the Gemini generated template file:

```
<%*
  // This script runs first when the template is applied to a new note.
  // It prompts for a post slug and renames the file to Jekyll's expected format.

  const formattedDate = tp.date.now("YYYY-MM-DD");
  const postSlug = await tp.system.prompt(
    "Enter post title slug (e.g., my-awesome-post):", 
    "new-post-slug" 
  );

  let newFilenameWithoutExtension;

  if (postSlug && postSlug.trim() !== "") {
    // User provided a slug
    newFilenameWithoutExtension = `${formattedDate}-${postSlug.trim().toLowerCase().replace(/\s+/g, '-')}`;
  } else {
    // User cancelled or entered an empty slug, use a default
    newFilenameWithoutExtension = `${formattedDate}-untitled-post`;
  }
  
  // Rename the current file. Templater handles adding .md if not present.
  await tp.file.rename(newFilenameWithoutExtension);
  
  // tp.file.title will now reflect the new filename (without .md)
  // This new title will be used by the frontmatter below.
%>---
layout: post
title: "<%* // Derive a human-readable title from the filename (e.g., "YYYY-MM-DD-my-post-slug" -> "My Post Slug")
  let filenameTitle = tp.file.title; 
  const datePrefixPattern = tp.date.now("YYYY-MM-DD") + "-";
  
  if (filenameTitle.startsWith(datePrefixPattern)) {
    filenameTitle = filenameTitle.substring(datePrefixPattern.length);
  }
  // Replace hyphens with spaces and capitalize each word
  tR += filenameTitle.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
%>"
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss ZZZZ") %> # Generates date, time, and timezone offset (e.g., +01:00)
categories: <% await tp.system.prompt("Enter categories as YAML list (e.g., [cat1, cat2, cat3])", "[journal, reflection]") %>
tags: <% await tp.system.prompt("Enter tags as YAML list (e.g., [tag1, tag2, tag3])", "[personal, daily]") %>
author: "Brian P. Casey" # Or your preferred author name
published: true # Set to false to keep it as a draft
# excerpt: "A brief summary of the post that can be used by some themes." # Uncomment and use if your theme supports it
# image: /assets/images/<%* let imgSlug = tp.file.title; const imgDatePrefix = tp.date.now("YYYY-MM-DD") + "-"; if (imgSlug.startsWith(imgDatePrefix)) { imgSlug = imgSlug.substring(imgDatePrefix.length); } tR += imgSlug %>.jpg # Example: use slug for image name
# image_alt: "Descriptive alt text for the image" # Good for accessibility
---

## Introduction (Optional Heading)

Start your blog post content here...
<% tp.file.cursor() %>


### Subheading

More content...
```

