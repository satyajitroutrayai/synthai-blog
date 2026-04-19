# SynthAI Blog — Complete Setup Guide

> Your AI Tools review blog, ready to deploy on Cloudflare Pages for **$0/month**.

---

## STEP 1: Install Hugo on Your Computer (5 minutes)

### On Windows:
```
1. Go to https://gohugo.io/installation/windows/
2. Download the "extended" version
3. Or use: winget install Hugo.Hugo.Extended
```

### On Mac:
```bash
brew install hugo
```

### On Linux:
```bash
sudo snap install hugo
```

### Verify it works:
```bash
hugo version
```
You should see something like `hugo v0.1xx.x...`

---

## STEP 2: Test Your Blog Locally (2 minutes)

Open your terminal/command prompt, navigate to this folder, and run:

```bash
cd synthai-blog
hugo server
```

Open your browser and go to: **http://localhost:1313**

You should see your blog with the 3 sample articles! Press `Ctrl+C` to stop the server.

---

## STEP 3: Create a GitHub Account + Repository (5 minutes)

1. Go to **https://github.com** and sign up (free)
2. Click the **+** button (top right) → **New repository**
3. Name it: `synthai-blog`
4. Set it to **Public** (required for free GitHub Actions)
5. Do NOT check "Add a README" (we already have files)
6. Click **Create repository**

### Push your blog to GitHub:

```bash
cd synthai-blog
git init
git add .
git commit -m "Initial blog setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/synthai-blog.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## STEP 4: Set Up Cloudflare Pages (10 minutes)

1. Go to **https://dash.cloudflare.com/sign-up** and create a free account
2. In the dashboard, click **"Workers & Pages"** in the left sidebar
3. Click **"Create"** → **"Pages"** → **"Connect to Git"**
4. Authorize GitHub and select your `synthai-blog` repository
5. Configure the build settings:
   - **Framework preset:** Hugo
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variable:** Add `HUGO_VERSION` = `0.147.0` (or latest)
6. Click **"Save and Deploy"**

**Your blog is now LIVE** at: `https://synthai-blog.pages.dev`

---

## STEP 5: Set Up Auto-Deploy via GitHub Actions (5 minutes)

This makes your blog auto-publish every day at 9 AM EST.

### Get Cloudflare API credentials:

1. In Cloudflare dashboard, click your profile icon → **"My Profile"**
2. Go to **"API Tokens"** → **"Create Token"**
3. Use the **"Edit Cloudflare Workers"** template
4. Set permissions: Account > Cloudflare Pages > Edit
5. Click **"Continue"** → **"Create Token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Also find your Account ID:

1. Go to Cloudflare dashboard homepage
2. Look in the right sidebar for **"Account ID"**
3. Copy it

### Add secrets to GitHub:

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add:
   - Name: `CLOUDFLARE_API_TOKEN` → Value: (paste your token)
   - Name: `CLOUDFLARE_ACCOUNT_ID` → Value: (paste your account ID)

**Done!** The GitHub Action will now auto-build and deploy your blog:
- Every time you push changes to GitHub
- Every day at 9:00 AM EST (for scheduled posts)

---

## STEP 6: (Optional) Add a Custom Domain ($10/year)

1. In Cloudflare dashboard → **"Workers & Pages"** → your project
2. Click **"Custom domains"** → **"Set up a custom domain"**
3. To buy a domain: Go to **Cloudflare Registrar** (cheapest, no markup)
   - Search for your domain (e.g., synthai.com)
   - Purchase (~$10/year for .com)
4. Point it to your Pages project — Cloudflare handles DNS automatically
5. Free SSL certificate is automatic

---

## HOW TO WRITE NEW BLOG POSTS

### Method 1: Command line (recommended)
```bash
hugo new posts/my-new-article.md
```
This creates a new post from the template. Edit it, then:
```bash
git add .
git commit -m "New post: my new article"
git push
```
Your blog auto-updates within 60 seconds!

### Method 2: Edit directly on GitHub (easiest — works from phone!)
1. Go to your repo on github.com
2. Navigate to `content/posts/`
3. Click **"Add file"** → **"Create new file"**
4. Name it: `my-new-article.md`
5. Paste this template at the top:

```yaml
---
title: "Your Article Title Here"
date: 2026-04-25
description: "A brief description for SEO"
categories: ["Reviews"]
tags: ["AI Writing", "Tools"]
icon: "🤖"
gradient: "linear-gradient(135deg, #667eea, #764ba2)"
featured: false
affiliate: true
toc: true
author: "SynthAI"
draft: false
---

Your article content in Markdown goes below...
```

6. Write your article below the `---`
7. Click **"Commit changes"**
8. Blog auto-deploys!

### Method 3: Schedule future posts (the automation magic!)
Set a future date in the frontmatter:
```yaml
date: 2026-05-15
```
This post will be invisible until May 15th. The daily GitHub Action
rebuilds at 9 AM EST, so it goes live automatically on that day.

**Write 7 posts on Sunday → schedule one for each day of the week!**

---

## GRADIENT COLORS FOR POST HEADERS

Use these in the `gradient` field to make each post visually unique:

```
Purple:   "linear-gradient(135deg, #667eea, #764ba2)"
Sunset:   "linear-gradient(135deg, #f093fb, #f5576c)"
Ocean:    "linear-gradient(135deg, #4facfe, #00f2fe)"
Dark:     "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
Warm:     "linear-gradient(135deg, #ffecd2, #fcb69f)"
Pink:     "linear-gradient(135deg, #a18cd1, #fbc2eb)"
Green:    "linear-gradient(135deg, #11998e, #38ef7d)"
Fire:     "linear-gradient(135deg, #f12711, #f5af19)"
```

---

## ICON EMOJIS FOR POSTS

Use these in the `icon` field:

```
AI General:  🤖 🧠 ⚡ 💡 🔮
Writing:     ✍️ 📝 📄 💬 🖊️
Video:       🎬 📹 🎥 🎞️
Images:      🎨 🖼️ 📸 🌈
Coding:      🧑‍💻 💻 ⌨️ 🔧
Money:       💰 💵 📈 🏦 💎
Productivity:🚀 ⏱️ 📊 🎯
```

---

## FOLDER STRUCTURE EXPLAINED

```
synthai-blog/
├── archetypes/          ← Template for new posts
│   └── default.md
├── content/             ← YOUR BLOG CONTENT (this is what you edit!)
│   ├── posts/           ← Blog articles go here
│   │   ├── claude-vs-chatgpt-vs-gemini-2026.md
│   │   ├── best-ai-writing-tools-2026.md
│   │   └── 4200-per-month-ai-tools-side-income.md
│   ├── about.md
│   ├── privacy.md
│   ├── affiliate-disclosure.md
│   └── newsletter.md
├── layouts/             ← HTML templates (don't touch unless customizing)
│   ├── _default/
│   ├── partials/
│   └── index.html
├── static/              ← CSS, JS, images
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml   ← Auto-deploy workflow
├── hugo.toml            ← Site configuration
└── README.md            ← This file
```

---

## NEXT STEPS AFTER SETUP

1. ✅ Replace sample content with your own articles
2. ✅ Update `hugo.toml` with your real site URL and social links
3. ✅ Sign up for affiliate programs (Jasper, Writesonic, Amazon Associates)
4. ✅ Set up ConvertKit/Beehiiv for the newsletter form
5. ✅ Replace `hello@synthai.com` with your real email
6. ✅ Submit sitemap to Google Search Console: `yourdomain.com/sitemap.xml`
7. ✅ Write and publish 2 new articles per week
8. ✅ Share on Reddit, Twitter, Pinterest after each publish

---

## NEED HELP?

- Hugo docs: https://gohugo.io/documentation/
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Markdown guide: https://www.markdownguide.org/

Good luck! Remember: consistency beats perfection. Publish, learn, improve. 🚀
