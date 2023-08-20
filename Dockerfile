# Use the official Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /usr/src/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install express
RUN npm install mysql2
RUN npm install cors

COPY . .

# Expose the app's port
EXPOSE 5000

# Start the backend
CMD ["node", "index.js"]