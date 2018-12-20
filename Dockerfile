FROM node:10.14-alpine

# Install NPM packages
WORKDIR /app
ADD package.json ./
ADD yarn.lock ./
RUN yarn
ADD . .

# Build
RUN npm run build

EXPOSE 3000

CMD npm run production
