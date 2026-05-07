# Docker frontend setting

# base image
FROM node:18-alpine

# work directory
WORKDIR /app

# installation
RUN npm install -g serve

# copy code
COPY . .

# expose port
EXPOSE 8080

# run app
CMD ["serve", ".", "-l", "8080"]