FROM node:20.5.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD ["node", "app.js"]
