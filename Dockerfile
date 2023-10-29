# Use an official Node.js runtime as base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first, for better caching
COPY package*.json ./
COPY run.js ./

# Install the project's dependencies inside the container
RUN npm install

# Define the command to run the application
CMD ["node", "run.js"]
