FROM node:16-alpine as builder
WORKDIR /tmp/app
RUN apk add jq
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile 
COPY . .
RUN yarn run build
RUN rm -Rf src
RUN yarn remove $(cat package.json | jq -r '.devDependencies | keys | join(" ")')

FROM node:16-alpine
WORKDIR /app
RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add dumb-init shadow
ARG USER=node
COPY --from=builder --chown=node:node /tmp/app .
RUN usermod -u 10000 $USER && groupmod -g 10000 $USER
RUN chown -R node:node .
USER $USER
EXPOSE 3000
ENV NEW_RELIC_NO_CONFIG_FILE=true
CMD ["dumb-init", "node", "./dist/app.js"]
