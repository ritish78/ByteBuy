# Specify base image
FROM node:18-alpine

# Specifying directory to be installed
WORKDIR /usr/src/bytebuy

# Copying from our machine to container
COPY package*.json .

# Installing dependencies
RUN npm install

# Copying all files
COPY . .