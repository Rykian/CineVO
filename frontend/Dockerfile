FROM node:10 as yarn

WORKDIR /app

ADD package.json yarn.lock .flowconfig /app/
ADD node_modules /app/node_modules
RUN yarn install

# Using a slim node container as a base for our final image
FROM node:9-slim
WORKDIR /app
ADD . /app

COPY --from=yarn /app/node_modules ./node_modules

RUN yarn build

CMD yarn server
