# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3001

CMD ["node", "index.js"]