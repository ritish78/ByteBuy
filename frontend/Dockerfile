# Specify base image
FROM node:alpine

# Specifying directory to be installed
WORKDIR /app

# Copying from our machine to container
COPY package.json package-lock.json ./

# Installing dependencies
RUN npm ci

# Copying all files
COPY ./ ./

CMD ["npm", "start"]