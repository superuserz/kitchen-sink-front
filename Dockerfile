# Use the official Node.js image to build the Angular app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including src/main.ts and src/polyfills.ts
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use the official Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the build stage
COPY --from=build /app/dist/kitchen-sink-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]