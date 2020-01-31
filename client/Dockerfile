FROM node:10 as build-stage

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 5000
ENTRYPOINT [ "serve" ]
CMD ["-s", "dist"]