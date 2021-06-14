FROM node:14.15.4-alpine
RUN mkdir -p /upflow-test
WORKDIR /upflow-test
RUN addgroup -S appgroup && adduser -S app -G appgroup
COPY package*.json /upflow-test/
RUN npm config set registry http://registry.npmjs.org/ && npm install
COPY ./ /upflow-test/
RUN chown -R app:appgroup /upflow-test
RUN npm run build -- --noninteractive
USER app
EXPOSE 3000
EXPOSE 3001
