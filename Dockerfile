FROM node:18-alpine as base

FROM base as builder

WORKDIR /home/node
COPY package*.json ./

ARG PAYLOAD_PUBLIC_CMS_URL
ENV PAYLOAD_PUBLIC_CMS_URL=${PAYLOAD_PUBLIC_CMS_URL}


COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

WORKDIR /home/node
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
