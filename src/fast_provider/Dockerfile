FROM golang:1.17-alpine AS builder
LABEL maintainer="Rusiru Bandara <it19104218@my.sliit.lk>"
WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY . .
ENV MONGOURI=mongodb://localhost:27017/fastproviderdb
ENV MONGO_ATLAS_URI=mongodb+srv://rusiruavb:RavB1998@fast-provider-cluster.lflfwhr.mongodb.net/?retryWrites=true&w=majority
ENV LOCAL_CONTAINER_REGISTRY_URL=localhost:5000
RUN go build -o apiserver .

FROM scratch
WORKDIR /app
COPY --from=builder /build /app/
EXPOSE 9000
ENTRYPOINT ["/apiserver"]