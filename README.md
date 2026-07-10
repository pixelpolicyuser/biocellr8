# BioCellR8 LLC — Official Website

Deployment-ready static website for BioCellR8 LLC, a translational sciences accelerator consultancy.

## Deploy to GitHub Pages

1. Open the `BioCellR8-Website-2` folder.
2. Select **everything inside the folder**, including hidden files such as `.nojekyll` and `.gitignore`.
3. Copy the selected contents into the root of the `pixelpolicyuser/biocellr8` repository, replacing the old website files.
4. Commit the changes to the branch used by GitHub Pages (normally `main`).
5. Allow GitHub Pages several minutes to publish, then visit <https://pixelpolicyuser.github.io/biocellr8/> and hard-refresh the page.

Do not upload the outer `BioCellR8-Website-2` folder as a nested directory. The `index.html`, `css`, `js`, and `assets` items must be at the repository root.

## Technology

- Semantic HTML5
- Responsive CSS3
- Vanilla JavaScript
- Self-hosted Montserrat and Playfair fonts
- No build process, paid dependency, cookies, analytics, or database

## Contact form

The inquiry form validates entries and prepares a real email addressed to `rzailckas@biocellr8.com` in the visitor’s default email application. GitHub Pages cannot process server-side forms by itself.

## Updating content

- Page copy and team bios: `index.html`
- Styling and responsive rules: `css/style.css`
- Navigation, reveal effects, and form behavior: `js/main.js`
- Team photographs: `assets/images/team/`

© 2026 BioCellR8 LLC. All rights reserved.
