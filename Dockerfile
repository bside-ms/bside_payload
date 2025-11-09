FROM node:20.10-alpine AS base

RUN corepack enable && corepack prepare yarn@4.9.2 --activate

WORKDIR /home/node

FROM base AS builder
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY . .
RUN yarn install --immutable --mode=skip-build
RUN yarn build

FROM base AS runtime

WORKDIR /home/node
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install --immutable --mode=skip-build
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
