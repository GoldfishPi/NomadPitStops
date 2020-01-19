FROM  node:12

RUN mkdir /user
WORKDIR /user

ENV PORT 3010
ENV HOST 0.0.0.0

COPY package.json .
COPY tsconfig.json .
COPY . .
#COPY yarn.lock .

RUN npm install

RUN npm run build
EXPOSE 3000
CMD npm run dev
