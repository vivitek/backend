FROM node:alpine
WORKDIR /app/user

COPY package.json .
RUN npm install --production

COPY . .
EXPOSE 1234
CMD node app.js
