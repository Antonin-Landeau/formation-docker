# Use the official Node.js image from the Docker Hub, specifically the version 20.10.0 with Alpine Linux for a smaller image size
FROM node:20.10.0-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json file from your local machine to the working directory in the container
COPY package.json .

# Install the dependencies specified in the package.json file
RUN npm install

# Copy all the remaining application files from your local machine to the working directory in the container
COPY . .

# Specify the command to run when the container starts, in this case, it runs the "dev" script defined in package.json
CMD [ "npm", "run", "dev" ]
