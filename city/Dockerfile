FROM node:13.12-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=7700
ENV AUTH=123

WORKDIR /dist

EXPOSE 7700

CMD node server.js
