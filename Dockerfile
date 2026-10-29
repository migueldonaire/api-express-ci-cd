# Etapa 1: compilar TypeScript
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Etapa 2: instalar solo las dependencias de producción
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Etapa 3: solo lo necesario para ejecutar
FROM node:24-alpine
# Instalamos los parches de seguridad de Alpine que aún no trae la imagen (Trivy)
# y quitamos npm: la API no lo necesita para arrancar y trae librerías con fallos
RUN apk upgrade --no-cache \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
WORKDIR /app
ENV NODE_ENV=production
ARG VERSION=dev
ENV APP_VERSION=$VERSION
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
