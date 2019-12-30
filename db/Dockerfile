FROM mongo:4.0.5-xenial

WORKDIR /usr/src/db
COPY . .

RUN apt-get update && apt-get install cron
RUN crontab -u root rcrontab
