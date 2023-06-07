FROM node:18-alpine as reactimg

WORKDIR /app

COPY package*.json /app

RUN npm install


COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]

