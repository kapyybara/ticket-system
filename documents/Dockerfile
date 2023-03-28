FROM node:16.19.0-buster as builder

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json .
COPY packages/ ./packages/
COPY documents/ ./documents/

# runs update in all subdirectories with a package.json
RUN pnpm -r update
RUN pnpm install
RUN pnpm build


FROM nginx:alpine as production
COPY --from=builder /app/documents/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY /documents/nginx/default.conf /etc/nginx/conf.d

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]