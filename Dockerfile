# Etapa 1: compilar TypeScript
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Etapa 2: solo lo necesario para ejecutar
FROM node:24-alpine
# Instalamos los parches de seguridad de Alpine que aún no trae la imagen (Trivy)
RUN apk upgrade --no-cache
WORKDIR /app
ENV NODE_ENV=production
ARG VERSION=dev
ENV APP_VERSION=$VERSION
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
