# Use the official Node.js image as the base image
FROM node:14

# Set the working directory for the client
WORKDIR /app/client

# Copy the client package.json and package-lock.json
COPY client/package*.json ./

# Install the client dependencies
RUN npm install --legacy-peer-deps

# Copy the client source code
COPY client/ .

# Build the React app
RUN npm run build

# Set the working directory for the server
WORKDIR /app/server

# Copy the server package.json and package-lock.json
COPY server/package*.json ./

# Install the server dependencies
RUN npm install

# Copy the server source code
COPY server/ .

# Expose the port the app runs on
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]