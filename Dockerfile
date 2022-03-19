FROM node:17 as base
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

#PRODUCTION
FROM base as production

ENV NODE_PATH=./build

RUN npm run build