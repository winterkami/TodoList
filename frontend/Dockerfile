# Use the official Node.js image as the base image for building the app
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Use the official Nginx image to serve the built app
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the world outside this container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]