# snapback-web

## Project Structure

- **web/** — Main app (Vite + React). Use this for all development and deployment.
- **legacy/** — Archived static HTML/CSS/JS site (no longer maintained).

## Development (Vite + React)

All new development should use the Vite project in `web/`.

### Start Dev Server

```bash
cd web
npm install
npm run dev
```

### Build for Production

```bash
cd web
npm run build
# Output: web/dist/
```

### Preview Production Build

```bash
cd web
npm run preview
```

## Deployment

Deploy the contents of `web/dist/` to your static hosting (e.g., GitHub Pages, Netlify, Vercel, etc).

## Legacy Static Site

The previous static HTML/CSS/JS site is now archived in the `legacy/` folder. It is no longer maintained or deployed.