# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4568

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "dev"]
