FROM node:14 as builder
WORKDIR /app

COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

# nginx
FROM nginx:1.21.1 AS final
ENV TZ Asia/Shanghai
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
