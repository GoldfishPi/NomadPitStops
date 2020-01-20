
FROM node

RUN mkdir -p /services/user
WORKDIR /services/user

COPY package.json /services/user
RUN npm install

COPY . /services/user

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
