FROM node:14

WORKDIR /snklpoint/
COPY ./package.json /snklpoint/
COPY ./yarn.lock /snklpoint/
RUN yarn install

COPY . /snklpoint/
CMD yarn start:dev
