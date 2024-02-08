FROM node:20.10.0-bookworm-slim

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

COPY ./dist ./dist

RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000"]
