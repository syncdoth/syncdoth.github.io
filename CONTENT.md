# Writing and updating portfolio content

For regular content updates, edit `src/content/`, `src/data/`, or `public/assets/`. The components, layouts, routes, and styles live separately under `src/`; you do not need to change those to add a paper, update a role, or publish a post.

## Profile and portfolio records

Edit the arrays and fields in these TypeScript files:

- `src/data/site.ts` — name, role, profile photo, contact links, research interests, and navigation.
- `src/data/timeline.ts` — experience, education, and news. Items appear in the order listed.
- `src/data/publications.ts` — publications, links, author lists, abstracts, and `selected` items.

## Blog posts

Add a Markdown file to `src/content/blog/`. Use a lowercase hyphenated filename such as `grounded-generation.md`:

```md
---
title: "A post title"
description: "One sentence shown in the writing list and search results."
pubDate: "2026-10-15"
tags: [Research, Language Models]
---

Write the post here in Markdown.
```

The post appears automatically in `/blog/` and gets a dated URL such as `/blog/2026/grounded-generation/`. Standard Markdown, tables, fenced code blocks, and LaTeX math are supported.

To archive a post without publishing it, move it to `src/content/blog/archive/`. Files inside any `archive/` folder are excluded from the homepage, blog listings, year pages, RSS feed, and generated post routes.

## Projects

Add one Markdown file per project in `src/content/projects/`:

```md
---
slug: "grounded-generation"
title: "Grounded Generation"
summary: "A short description for the project card and page metadata."
image: "/assets/img/grounded-generation/cover.png"
repository: "https://github.com/username/repository"
category: "research"
---

Describe the project here in Markdown.
```

Add the image under `public/assets/`. To archive a project, move it to `src/content/projects/archive/`. Files inside any `archive/` folder and projects marked `draft: true` remain editable in the repo but do not appear on the site. Keep an existing `slug` when editing a published project so its URL stays the same.

## Research and coursework pages

Edit `src/content/pages/research.md` or `src/content/pages/courseworks.md`. Their titles and descriptions are in the frontmatter; the rest is ordinary Markdown.

## Images and PDFs

Put static files under `public/assets/` and refer to them from content with a leading slash, for example `/assets/pdf/resume.pdf` or `/assets/img/prof_pic.jpg`. Keep original filenames when replacing an existing file so the published link does not change.
