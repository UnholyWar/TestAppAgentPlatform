FROM node:24-alpine
WORKDIR /app
COPY --chmod=0644 server.js ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
