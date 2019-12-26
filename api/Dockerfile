FROM node

# Create app directory
#WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN mkdir /api
WORKDIR /api

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

#RUN npm run build
# COPY ./src/config.docker.json ./dist/src/config.json
# COPY ./src/firebase-admin.json ./dist/src/
# WORKDIR ./dist

EXPOSE 3001
CMD npm run dev
