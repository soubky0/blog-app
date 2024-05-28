FROM node:20.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "migrate"]

CMD ["npm", "start"]

EXPOSE ${PORT}
