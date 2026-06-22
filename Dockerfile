# Shared dependency layer, reused by the ci and build targets.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Lint target, used by CI (docker build --target ci).
FROM deps AS ci
COPY . .
RUN npx eslint src --max-warnings=0

# Production build target: bundles the static site.
FROM deps AS build
COPY . .
RUN npm run build

# Serve the static bundle with nginx.
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# Liveness probe. Use 127.0.0.1 (not localhost): nginx listens IPv4-only and
# busybox wget would resolve localhost to ::1 and get connection refused.
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
