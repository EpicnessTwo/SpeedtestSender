FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY run.js ./

RUN apk add --no-cache --virtual .build-deps \
    g++ make python3 && \
    npm install --production && \
    apk del .build-deps

CMD ["node", "run.js"]