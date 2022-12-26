FROM node:14-alpine as base

FROM base as builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build


FROM base as runtime
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json  ./

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs \
    && chown -R nodejs:nodejs ./package*.json && npm ci --production \
    && mkdir ./media && chown -R nodejs:nodejs ./media ./node_modules

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/build ./build

USER nodejs:nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
