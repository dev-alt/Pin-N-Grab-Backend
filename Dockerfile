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
RUN npm install sequelize-cli

# Copy the wait-for-it script
COPY wait-for-it.sh /usr/src/
RUN chmod +x /usr/src/wait-for-it.sh

# Copy the application code
COPY . .

# Expose the app's port
EXPOSE 5000

# Wait for MySQL to be up and running, then run migrations
CMD ["./usr/src/wait-for-it.sh", "mysql:3306", "--", "npx", "sequelize-cli", "db:migrate"]

# Start the backend
CMD ["node", "app.js"]
