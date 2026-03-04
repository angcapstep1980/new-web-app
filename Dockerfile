# Stage 1 - Build
FROM node:18-alpine AS builder
WORKDIR /app
# Install dependencies (compresi quelli di sviluppo))
COPY package*.json ./
RUN npm install 
COPY . .
# Run tests (lanciato una tantum npx ts-jest config:init per creare il file jest.config.js usato dopo)
RUN npm run test
# Build the TypeScript code
RUN npm run build

# Stage 2 - Production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]