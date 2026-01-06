FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

RUN addgroup -S app && adduser -S app -G app
USER app

COPY . .


FROM node:20-alpine AS development

WORKDIR /app

COPY --from=builder /usr/src/app .

RUN chmod +x entrypoint.sh
  
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "src/server.js"]