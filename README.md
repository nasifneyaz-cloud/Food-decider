# Use It Up (PWA)

All files sit in one flat folder. To publish on GitHub Pages:

1. Upload every file here to a public repo (branch `main`).
2. In the repo, open `deploy.yml` → pencil icon → rename it to `.github/workflows/deploy.yml` → Commit.
3. Settings → Pages → Source: **GitHub Actions**.
4. Wait for the green tick in the Actions tab. Site: `https://USERNAME.github.io/REPO/`

Bump `VERSION` in `sw.js` whenever you update the site so visitors get the new version.
