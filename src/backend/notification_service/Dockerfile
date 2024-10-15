# Dockerfile for building the Notification Service container.
# Addresses Requirement:
# - Notification and Alerting System
#   Location: Technical Specification/5.17 Feature ID: F-017
#   Description: Develops a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.

# Use the official Python 3.9 image as the base image.
# External Dependency:
# - Python 3.9  # Base image for running Python applications.
FROM python:3.9

# Set the working directory in the container to /app.
# This directory will hold the application code.
WORKDIR /app

# Copy the requirements.txt file into the container.
# Internal Dependency:
# - requirements.txt  # Lists all Python dependencies required for the service.
COPY requirements.txt /app/

# Install the Python dependencies listed in requirements.txt.
# These dependencies are essential for implementing the notification service as per Feature ID: F-017.
# External Dependencies included (versions specified in requirements.txt):
# - Flask==2.0.1           # Web framework for handling HTTP requests.
# - Flask-RESTful==0.3.9   # Provides RESTful API support.
# - Flask-SQLAlchemy==2.5.1  # Integrates SQLAlchemy with Flask for ORM capabilities.
# - Flask-Migrate==3.1.0   # Handles database migrations for the notification service.
# - PyJWT==2.1.0           # Handles JSON Web Tokens for secure authentication.
# - requests==2.26.0       # Makes HTTP requests to external services.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container.
# Internal Dependencies:
# - app.py  # Main application file to initialize and run the notification service.
COPY . /app

# Expose the port that the Flask app runs on.
# Port 5000 is exposed to allow the service to handle HTTP requests for notifications, as required by Feature ID: F-017.
EXPOSE 5000

# Define the command to run the application using Flask.
# This command starts the notification service (app.py), which is responsible for processing notification requests and sending notifications to users, addressing Feature ID: F-017.
CMD ["python", "app.py"]