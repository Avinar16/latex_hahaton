
FROM node:23.1-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm ci --only=development --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm",  "run",  "dev"]