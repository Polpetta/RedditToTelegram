FROM node:alpine

MAINTAINER Davide Polonio <poloniodavide@gmail.com>

COPY node_modules /usr/src/app/node_modules
COPY dist /usr/src/app/dist

ENTRYPOINT ["node", "/usr/src/app/dist/index.js"]