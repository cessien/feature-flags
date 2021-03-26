FROM node:14 AS yarn-build

ADD . /app
WORKDIR /app/ui
RUN yarn install
RUN yarn build

FROM golang:alpine as go-build
ADD . /app
WORKDIR /app
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /app/feature-flags


FROM scratch
COPY --from=yarn-build /app/ui/build /ui/build
COPY --from=go-build /app/feature-flags /feature-flags

EXPOSE 8080

ENTRYPOINT ["/feature-flags"]