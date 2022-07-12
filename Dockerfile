FROM node:16-slim as base

ENV PORT 80

ARG user
RUN mkdir /app && chown -R $user:$user /app
USER $user
WORKDIR /app

COPY --chown=$user:$user package.json yarn.lock /app/
RUN yarn install

COPY --chown=$user:$user . /app
RUN yarn build

CMD yarn start -p $PORT
