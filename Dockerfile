FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --force

COPY . .

USER node

CMD [ "npm", "start" ]
