FROM node:14-apline AS BASE_IMAGE
WORKDIR /base_micro_automater
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
