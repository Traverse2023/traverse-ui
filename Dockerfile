FROM node:20.10.0-bookworm-slim

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000"]
