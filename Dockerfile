FROM node:14

WORKDIR /snkpoint/
COPY ./package.json /snkpoint/
COPY ./yarn.lock /snkpoint/
RUN yarn install

COPY . /snkpoint/
CMD yarn start:dev
