FROM node:11.4-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY . .

RUN apk --no-cache add --virtual build-deps python g++ make
RUN npm install --only=production
RUN apk del build-deps
# RUN apk --no-cache add bash

EXPOSE 5000

CMD ["node", "server.js"]
