FROM mongo:4.0.5-xenial

WORKDIR /usr/src/db
COPY . .

RUN crontab -u root rcrontab
