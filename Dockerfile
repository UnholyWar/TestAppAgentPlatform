FROM node:24-alpine
WORKDIR /app
COPY --chmod=0644 server.js index.html style.css script.js ./
RUN mkdir -m 0755 assets && mkdir -m 0755 assets/images
COPY --chmod=0644 assets/images/* ./assets/images/
USER node
EXPOSE 3000
CMD ["node", "server.js"]
