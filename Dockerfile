FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3005

ENV HOSTNAME=0.0.0.0
ENV PORT=3005

CMD ["sh", "-c", "yarn start -H 0.0.0.0 -p ${PORT}"]
