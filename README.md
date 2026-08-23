# Jake's West Coast

A website for the Jake's West Coast channel. Built as a React app.

## Stack

- **React 19**
- **Plain CSS** per component — dark theme, frosted glass navbar, responsive video grid
- **Docker** for containerized deployment

## Structure

```
src/
├── App.js                  # Root layout, routing
├── components/
│   ├── Navbar.js/css       # Fixed frosted glass nav
│   ├── Home.js/css         # Full-viewport hero
│   ├── About.js/css        # Bio page
│   ├── Projects.js/css     # Video gallery
│   └── VideoCard.js/css    # Individual YouTube embed card
└── data/
    └── videos.js           # Video metadata
```

## Running

### Local development
```
npm install
npm start
```

### Docker
```
docker compose down && docker system prune -af && docker compose build && docker compose up -d && docker logs -f jakeswestcoast
```

## Reproducible builds

CI builds must not change because something upstream published a new version.
Three things are pinned, and all three need to stay that way:

1. **`package-lock.json` is committed** and the image installs with `npm ci`, not
   `npm install`. Never add it back to `.gitignore`.
2. **Base images are pinned by digest** in the [Dockerfile](Dockerfile). To move to a newer
   base, run `docker buildx imagetools inspect node:24-alpine` (or `nginx:alpine`)
   and paste the reported digest, updating the version in the tag and comment too.
3. **TypeScript is pinned to 4.9.5**, in both `devDependencies` and `overrides`.
   `react-scripts@5` only supports TypeScript `^3.2.1 || ^4`; transitive packages
   ask for a much wider range, so without the pin npm hoists whatever the latest
   TypeScript is and the ESLint plugins fail to load against its API.

The npm major version that writes the lock file has to match the one in the
image (currently 11.x, from `node:24-alpine`), or `npm ci` rejects the lock as
out of sync. If you regenerate the lock with a different npm, bump the base
image to a Node release carrying the same npm major.
