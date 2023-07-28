# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install   # or yarn install, depending on your package manager

# Copy the rest of the project files to the container
COPY . .

# Build the ReactJS project (if you are using create-react-app or similar, adjust this command accordingly)
RUN npm run build  # or yarn build, depending on your build script

# Expose port 3000 (assuming your ReactJS app runs on port 3000)
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]   # or ["yarn", "start"], depending on your start script
