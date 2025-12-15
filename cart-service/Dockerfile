FROM node:24.12.0-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3002
CMD ["node", "index.js"]
