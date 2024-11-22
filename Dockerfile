# Use the Nginx image to serve the web application
FROM nginx:alpine

# Copy the HTML, CSS, and JavaScript files into the Nginx document root
COPY . /usr/share/nginx/html

# Set the default file to translate_game.html
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html

# Expose port 80 to allow access to the web server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]


