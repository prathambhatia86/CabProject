FROM node:lts-alpine

WORKDIR /app

COPY . .


USER node

CMD [ "npm", "run", "server" ]

EXPOSE 5000