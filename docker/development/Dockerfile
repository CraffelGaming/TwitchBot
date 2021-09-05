FROM node:14.17.6
WORKDIR /app
ENV NODE_ENV=dev
COPY package*.json ./
RUN npm install ts-node -g
RUN npm install
COPY . .
CMD [ "npm", "run", "serve" ]
