# Use the official Python 3.9 image as the base image
# This ensures the application runs in a consistent environment with the specified Python version
# Reference: Dependencies -> External Dependency - Python 3.9
# Technical Specification/6.3.2 Backend - Authentication Service requires Python as base language
FROM python:3.9

# Set the working directory in the Docker image to /app
# All subsequent commands will be run in this directory
WORKDIR /app

# Copy the requirements.txt file into the image at /app/requirements.txt
# The requirements.txt lists all Python dependencies necessary for the application
# Reference: Internal Dependency - requirements.txt
COPY requirements.txt .

# Install the Python dependencies specified in requirements.txt
# This includes Flask (2.0.1), Flask-JWT-Extended (4.3.1), SQLAlchemy (1.4.25), bcrypt (3.2.0), PyJWT (2.3.0)
# These dependencies are crucial for implementing secure authentication and authorization features
# Technical Specification/5.1 Feature ID: F-001 - Secure User Authentication and Role-Based Authorization
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire current directory (authentication service code) into the Docker image
# This includes app.py, config.py, models.py, utils.py, routes.py, and other source files
# Reference: Internal Dependencies - app.py, config.py, models.py, utils.py, routes.py
COPY . .

# Set environment variables required for the application configuration
# FLASK_APP sets the entry point of the Flask application
# FLASK_ENV is set to 'production' to indicate the application is running in a production environment
# These configurations support secure application operations as per requirement
# Technical Specification/6.3.2 Backend - Configuration settings for the application
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Expose the application port 5000 for external access
# This allows the Flask application to be accessible from outside the container
# Technical Specification/6.3.2 Backend - Ensuring the service is accessible
EXPOSE 5000

# Define the command to run the Flask application using app.py
# This command starts the authentication service, enabling secure login and role-based access levels
# Addresses: Technical Specification/5.1 Feature ID: F-001 - Implement secure login and role-based authorization
CMD ["flask", "run", "--host=0.0.0.0"]