FROM node:20.10-alpine AS base

RUN corepack enable && corepack prepare yarn@4.9.2 --activate

WORKDIR /home/node

ARG NEXT_PUBLIC_CMS_URL
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}

FROM base AS builder
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

COPY . .
RUN yarn install --immutable --mode=skip-build
RUN node -p "process.env.NEXT_PUBLIC_CMS_URL"
RUN yarn build

FROM base AS runtime
ENV NODE_ENV=production
WORKDIR /home/node
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

ARG NEXT_PUBLIC_CMS_URL
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}

COPY --from=builder /home/node/.next ./.next
COPY --from=builder /home/node/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start", "-p", "3000"]
