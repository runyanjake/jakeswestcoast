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
