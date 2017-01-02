FROM node:alpine

MAINTAINER Davide Polonio <poloniodavide@gmail.com>

COPY dist /usr/src/app/dist
COPY node_modules /usr/src/app/node_modules

ENTRYPOINT ["node", "/usr/src/app/dist/index.js"]