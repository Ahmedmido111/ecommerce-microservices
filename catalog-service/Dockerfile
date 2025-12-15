FROM node:24.12.0-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001
CMD ["node", "index.js"]
