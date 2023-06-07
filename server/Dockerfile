FROM node:18-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install


COPY . /app

#COPY ./dist /app/dist

EXPOSE 3001

CMD ["npm", "run", "start"]