# Docker backend setting 

# Base image
FROM node:18-alpine

# Work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production deps
RUN npm install --omit=dev

# Copy code
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "src/server.js"]