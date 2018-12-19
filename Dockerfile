FROM node:11.4-alpine

WORKDIR /usr/src/app
COPY . .

RUN apk --no-cache add --virtual bdeps python g++ make \
    && npm install --only=production \
    && apk del bdeps
# RUN apk --no-cache add bash

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]
