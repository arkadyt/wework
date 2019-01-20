# Container would expect an --env-file with:
# - NODE_ENV 
# - MONGO_URI
# - SECRET_OR_KEY

FROM node:11.4-alpine

WORKDIR /usr/src/app
COPY . .

RUN apk --no-cache add --virtual bdeps python g++ make \
 && npm install --only=production \
 && apk del bdeps

EXPOSE 5000

CMD ["node", "server.js"]
