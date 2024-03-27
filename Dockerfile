
FROM node


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn


COPY . .


EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]
