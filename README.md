# jakeswestcoast
Jake's West Coast Website

## First Time Setup
1. Create basic react app.
```
npx create-react-app jakeswestcoast
cd jakeswestcoast
npm start
```
2. Install missing packages
```
npm install web-vitals
npm install react-router-dom
```
3. Test changes/fixes with
```
npm install
npm start
```

## Running

### Local development
```
npm start
```

### Docker
```
docker compose down && docker system prune -af && docker compose build && docker compose up -d && docker logs -f jakeswestcoast
```