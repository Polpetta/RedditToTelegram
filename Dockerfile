FROM node:8-slim

MAINTAINER Davide Polonio <poloniodavide@gmail.com>
LABEL Push new reddit posts directly in your Telegram groups!

COPY dist /usr/src/app/dist
COPY package.json /usr/src/app

WORKDIR /usr/src/app/
RUN mkdir -p .data/subscriptions

RUN npm install --production

ENTRYPOINT ["npm", "start"]
