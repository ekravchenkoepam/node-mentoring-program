FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production && \
    npm cache clean --force

USER node

COPY . .

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/health || exit 1

CMD ["npm", "start"]