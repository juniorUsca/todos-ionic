FROM node:11

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn install

ADD . /app

EXPOSE 4000

#CMD ["node", "index.js"]
CMD ["./wait-for-it.sh", "db:27017", "--", "node", "index.js"]