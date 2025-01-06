FROM node:22

WORKDIR /server

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]