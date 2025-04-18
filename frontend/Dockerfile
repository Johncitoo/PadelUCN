# frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Servidor simple para servir el build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]
