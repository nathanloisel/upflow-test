FROM node:14.15.4-alpine
RUN mkdir -p /upflow-test
WORKDIR /upflow-test
RUN addgroup -S appgroup && adduser -S app -G appgroup
COPY package*.json /upflow-test/
RUN npm install
COPY ./ /upflow-test/
RUN chown -R app:appgroup /upflow-test
USER app
EXPOSE 3000
