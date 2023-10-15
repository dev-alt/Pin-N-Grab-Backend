# Use the official Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /usr/src/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN apt-get -q update && apt-get -qy install netcat

# Copy the wait-for script
COPY wait-for.sh /usr/src/
RUN chmod +x /usr/src/wait-for.sh

# Copy the application code
COPY . .

# Expose the app's port
EXPOSE 5000

# Start the backend using the wait-for script
CMD ["./wait-for.sh", "mysql:3306", "--", "npm", "start"]
