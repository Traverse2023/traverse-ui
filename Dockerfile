FROM node:20.10.0-bookworm-slim as build

WORKDIR /app

ARG VITE_APP_BACKEND_URL

ARG VITE_APP_BACKEND_URL

ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL

ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

FROM build as run

CMD ["npm", "start"]