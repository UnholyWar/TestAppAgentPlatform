FROM node:24-alpine
WORKDIR /app
COPY --chmod=0644 server.js ./
RUN mkdir -m 0755 assets
COPY --chmod=0644 assets/index.html assets/oyun-gecesi.jpg ./assets/
USER node
EXPOSE 3000
CMD ["node", "server.js"]
