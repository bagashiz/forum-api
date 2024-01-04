# Start base image build
FROM node:18.19.0-alpine as base

# Set working directory
WORKDIR /forumapi

# Copy package file
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Migrate database and start server
CMD ["sh", "-c", "npm run migrate up && npm run start"]
