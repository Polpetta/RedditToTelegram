FROM node:alpine

MAINTAINER Davide Polonio <poloniodavide@gmail.com>

COPY node_modules /usr/src/app/node_modules
COPY dist /usr/src/app/dist
COPY package.json /usr/src/app

WORKDIR /usr/src/app/

RUN npm prune --production

ENTRYPOINT ["npm", "start"]
