# Adya Tirvir Portfolio — Complete Setup Handbook

This package contains a complete static portfolio website designed for GitHub Pages.
No coding tools, paid hosting, Wix plan, or command line are required.

Your intended website address is:

**https://dradya.github.io/**

---

## 1. What is included

```text
dradya.github.io/
├── index.html       Main page, written content, links, and SEO information
├── style.css        Design, colours, layout, animations, and mobile styling
├── favicon.svg      Small AT icon shown in the browser tab
├── robots.txt       Allows search engines to crawl the website
├── sitemap.xml      Tells search engines about the website URL
├── README.md        Description displayed on the GitHub repository
└── SETUP-GUIDE.md   This handbook
```

The site is plain HTML and CSS. GitHub Pages can publish it directly; there is no
build command and no package installation.

---

## 2. Important security check before publishing

Your portfolio links to your public projects, so check every linked repository.

1. Never publish an `.env` file, API key, password, access token, or private key.
2. If a key was ever visible on GitHub, revoke or rotate it. Deleting the file alone
   does not make an exposed key safe again.
3. Add `.env` to the project's `.gitignore` file.
4. Replace secrets in example code with placeholders such as `YOUR_API_KEY_HERE`.
5. Check screenshots, documentation, commit history, and configuration files too.

This website package itself contains no credentials.

---

## 3. Upload the website to GitHub

Your repository should be named exactly:

```text
dradya.github.io
```

### Upload using the GitHub website

1. Download this ZIP and extract it on your computer.
2. Open **https://github.com/dradya/dradya.github.io** while signed in.
3. Click **Add file**, then **Upload files**.
4. Open the extracted folder on your computer.
5. Select the seven files listed in Section 1 and drag them into GitHub.
6. Upload the files themselves, not the outer folder.
7. Confirm that `index.html` will be at the repository's top level.
8. In the commit-message box, enter:

   ```text
   Launch Adya Tirvir portfolio
   ```

9. Choose **Commit directly to the main branch**.
10. Click **Commit changes**.

It is fine to replace the small README that is already in the repository with the
README from this package.

### The most common upload mistake

This is correct:

```text
dradya.github.io/index.html
```

This is incorrect:

```text
dradya.github.io/Adya-Tirvir-GitHub-Pages-Portfolio/index.html
```

If GitHub shows an extra folder before `index.html`, move or re-upload the files so
that `index.html` is visible immediately when you open the repository.

---

## 4. Turn on GitHub Pages

1. Open **https://github.com/dradya/dradya.github.io**.
2. Click **Settings** in the repository menu.
3. In the left sidebar, click **Pages** under **Code and automation**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set **Branch** to `main`.
6. Set the folder to `/ (root)`.
7. Click **Save**.
8. Wait a few minutes, then open **https://dradya.github.io/**.

GitHub may configure a correctly named personal Pages repository automatically, but
you should still check the Pages screen and confirm that `main` and `/ (root)` are
selected.

Official instructions: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

---

## 5. Check the live website

Once the site opens, test the following:

- Open it in a private/incognito browser window.
- Check it on both a phone and a computer.
- Click the GitHub and LinkedIn buttons.
- Open all three project links.
- Scroll through About, Experience, Projects, Skills, Education, and Connect.
- Confirm the browser tab says **Adya Suhas Tirvir** and displays the AT icon.
- Confirm that the address uses HTTPS: `https://dradya.github.io/`.

If everything works, add the website URL to:

- the **Website** field on your GitHub profile;
- the **Contact info** or **Featured** section on LinkedIn;
- your resume and professional profiles where appropriate.

These consistent links help search engines understand that the website, GitHub
profile, LinkedIn profile, and projects belong to the same person.

---

## 6. Connect the site to Google Search Console

Publishing does not guarantee immediate Google indexing. Search Console lets you
verify ownership, submit the sitemap, and request indexing.

### A. Add the property

1. Open **https://search.google.com/search-console**.
2. Sign in with your Google account.
3. Choose **Add property**.
4. Select **URL prefix**, not Domain.
5. Enter this exact address, including `https://` and the final slash:

   ```text
   https://dradya.github.io/
   ```

6. Click **Continue**.

### B. Verify using an HTML tag

1. In the ownership-verification choices, select **HTML tag**.
2. Google will give you a line similar to this:

   ```html
   <meta name="google-site-verification" content="YOUR_UNIQUE_CODE">
   ```

3. Copy Google's complete line. Do not copy the sample above.
4. In GitHub, open `index.html` and click the pencil icon to edit it.
5. Paste Google's line anywhere inside the `<head>` section. A good position is
   immediately below this line:

   ```html
   <meta name="author" content="Adya Tirvir">
   ```

6. Commit the change to `main`.
7. Wait for the GitHub Pages deployment to finish.
8. Return to Search Console and click **Verify**.
9. Keep the verification tag in `index.html` permanently.

Google's verification guide: [Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en).

### C. Submit the sitemap

1. In Search Console, open your `https://dradya.github.io/` property.
2. Click **Sitemaps** in the left sidebar.
3. In **Add a new sitemap**, enter:

   ```text
   sitemap.xml
   ```

4. Click **Submit**.

The complete sitemap URL is:

```text
https://dradya.github.io/sitemap.xml
```

Google's guide: [Manage your sitemaps](https://support.google.com/webmasters/answer/7451001?hl=en).

### D. Request indexing

1. In Search Console, click **URL inspection**.
2. Enter:

   ```text
   https://dradya.github.io/
   ```

3. Press Enter and wait for the inspection.
4. Click **Request indexing** if the option is shown.

Google's guide: [URL Inspection tool](https://support.google.com/webmasters/answer/9012289?hl=en).

Google decides when and whether to index or rank a page. Search Console helps Google
discover the site, but it cannot guarantee a particular position or an immediate
result. Recheck after several days and avoid repeatedly submitting the same URL.

---

## 7. How to edit the website later

You can edit any file directly on GitHub:

1. Open the file in your repository.
2. Click the pencil icon.
3. Make the change.
4. Click **Commit changes**.
5. Wait for GitHub Pages to deploy the new version.

### Change written information

Edit `index.html`. Use your browser's Find command (`Ctrl+F` or `Cmd+F`) to locate
the existing sentence, date, college, project, or link and replace it carefully.

Useful locations inside `index.html`:

- `<title>` controls the title displayed in search results and browser tabs.
- `<meta name="description">` provides the search-result description.
- The JSON-LD block describes you to search engines as a person.
- The visible page sections contain your portfolio text.
- `href="..."` values contain profile and project links.

Keep important information truthful, current, and consistent with your GitHub and
LinkedIn profiles. Do not add claims or awards that you cannot support.

### Change colours

Open `style.css`. The main colours are near the top inside `:root`:

```css
--background: #070a0f;
--foreground: #f1f7f7;
--primary: #72f7d4;
--accent: #9a83ff;
```

Change only the hexadecimal colour values, commit, and check the website.

### Add a resume later

1. Rename the PDF to `Adya-Tirvir-Resume.pdf`.
2. Upload it to the repository root.
3. Add this button beside the existing hero buttons in `index.html`:

   ```html
   <a class="button secondary" href="Adya-Tirvir-Resume.pdf" target="_blank">View resume</a>
   ```

Do not publish a resume containing unnecessary private information such as your full
home address, personal identification numbers, signature, or document numbers.

---

## 8. Troubleshooting

### The website shows a 404 error

Check all of these:

- Repository name is exactly `dradya.github.io`.
- Repository is public if your GitHub plan requires a public Pages repository.
- File is named exactly `index.html`, using lowercase letters.
- `index.html` is in the repository root, not inside another folder.
- Settings → Pages uses `main` and `/ (root)`.
- The latest workflow under the repository's **Actions** tab finished successfully.
- You waited a few minutes and refreshed the page.

### The old version still appears

- Hard-refresh the page with `Ctrl+Shift+R` or `Cmd+Shift+R`.
- Try a private/incognito window.
- Check the latest deployment under **Actions**.
- Confirm your change was committed to the `main` branch.

### The design has no styling

- Confirm `style.css` is at the same level as `index.html`.
- Confirm its filename is exactly `style.css`.
- Do not change this line in `index.html` unless the file location changes:

  ```html
  <link rel="stylesheet" href="style.css">
  ```

### Search Console verification fails

- Open the public website and use **View page source** to check that Google's meta
  tag is actually inside `<head>`.
- Confirm the GitHub Pages deployment completed after your commit.
- Verify the exact URL-prefix property `https://dradya.github.io/`.
- Do not paste the tag into `README.md`; it must be in `index.html`.

### Google has not indexed the website yet

- Confirm the live page is public and works without signing in.
- Confirm `https://dradya.github.io/robots.txt` opens.
- Confirm `https://dradya.github.io/sitemap.xml` opens.
- Check URL Inspection in Search Console for crawl or indexing problems.
- Keep your GitHub and LinkedIn links public and consistent.
- Allow time. Discovery and ranking are controlled by Google.

---

## 9. What this website can and cannot do

The website gives Google a clear, accurate, first-party page about Adya Suhas Tirvir.
It can strengthen your professional search presence over time when connected to your
real profiles and projects.

It does **not** directly train Google's AI, guarantee first place in search, or remove
the Scribd page. Continue the separate Scribd and Google delisting requests for that
specific result. Use only accurate information and genuine proof; never create fake
profiles, reviews, articles, or credentials.

---

## 10. Final launch checklist

- [ ] No secrets or API keys are public in linked repositories
- [ ] All seven website files are at the repository root
- [ ] GitHub Pages is set to `main` and `/ (root)`
- [ ] `https://dradya.github.io/` opens publicly
- [ ] GitHub, LinkedIn, and project links work
- [ ] Website looks correct on mobile and desktop
- [ ] Website URL is added to GitHub and LinkedIn
- [ ] Search Console URL-prefix property is verified
- [ ] `sitemap.xml` is submitted
- [ ] Homepage indexing is requested once

You now have a complete, editable portfolio with free GitHub Pages hosting.
