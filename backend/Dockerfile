# Use an official Node.js alpine image runtime as the base image
FROM node:20-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

RUN npm install

# Build the application
RUN npm run build

# Expose port 3089
EXPOSE 3089

# Start the Node.js application
CMD ["npm", "start"]
