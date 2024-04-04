FROM node:16 as build-stage

WORKDIR /app/server
COPY package*.json ./
RUN npm install - force
COPY . .
RUN npm run build

WORKDIR /app/client
COPY package*.json ./
RUN npm install - force
COPY . .
RUN npm run build

# Use NGINX as the production server
FROM nginx:1.21-alpine
COPY - from=build-stage /app/server/build /usr/share/nginx/html
COPY - from=build-stage /app/client/build /usr/share/nginx/html
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
