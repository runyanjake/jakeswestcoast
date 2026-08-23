# Base images are pinned by digest, not by floating tag: an upstream rebuild of
# node:20-alpine or nginx:alpine must never change what CI builds. The tag next
# to the digest is documentation only — Docker resolves the digest.
# To move to a newer base: docker buildx imagetools inspect node:20-alpine
# and copy the reported digest here.

# Shared dependency layer, reused by the ci and build targets.
# node 24.19.0 (active LTS; 20.x is end-of-life) / npm 11.17.0. The npm major
# must match the one that writes package-lock.json locally, or `npm ci` rejects
# the lock as out of sync.
FROM node:24.19.0-alpine@sha256:d32cdf619f63fe0471182d08996dd516c6275bb5fd31ae06e55a570bd9e1ad43 AS deps
WORKDIR /app
# package-lock.json is committed, and `npm ci` installs exactly what it pins.
# `npm install` would re-resolve the tree at build time, which is how a
# TypeScript 7 release silently broke the lint stage in build #12.
COPY package.json package-lock.json ./
RUN npm ci

# Lint target, used by CI (docker build --target ci).
FROM deps AS ci
COPY . .
# `npm run lint` uses the eslint from the locked tree; bare `npx eslint` would
# fall back to fetching a copy from the registry if it were ever missing.
RUN npm run lint

# Production build target: bundles the static site.
FROM deps AS build
COPY . .
RUN npm run build

# Serve the static bundle with nginx.
# nginx 1.31.4
FROM nginx:1.31.4-alpine@sha256:db35bfc6b2951e7f8a72db5db120288c127ffaeeb4a6d4b95a26fead017d5913
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# Liveness probe. Use 127.0.0.1 (not localhost): nginx listens IPv4-only and
# busybox wget would resolve localhost to ::1 and get connection refused.
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
