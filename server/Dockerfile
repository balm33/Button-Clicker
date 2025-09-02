# Use Node.js LTS
FROM node:22

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

EXPOSE 8080
CMD ["node", "index.js"]
