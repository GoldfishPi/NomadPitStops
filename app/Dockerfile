FROM node:10

RUN mkdir /app

WORKDIR /app

ENV PORT 3005
ENV HOST 0.0.0.0

COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .


RUN yarn install

#COPY . .

RUN yarn build

#CMD yarn start
