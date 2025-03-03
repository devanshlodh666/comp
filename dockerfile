# Use official Node.js image
FROM node:latest 

# Set working directory
WORKDIR /home/app                        

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./  

# Install dependencies
RUN npm install    

# Copy the rest of the project files
COPY . .                             

# Set environment variable
ENV PORT=3000                    

# Build the app
RUN npm run build                  

# Expose port 3000
EXPOSE 3000                                     

# Run the app
CMD ["npx", "serve@latest", "out"]
