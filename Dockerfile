FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
		pnpm install --frozen-lockfile

FROM deps AS development
ENV NODE_ENV=development		
COPY . .
EXPOSE 3000			
CMD ["pnpm", "dev"]

FROM deps AS builder
COPY . .
RUN pnpm gen:api && pnpm build

FROM base AS production
ENV NODE_ENV=production \
		PORT=3000 \
		HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/.next/standalone ./ 
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]