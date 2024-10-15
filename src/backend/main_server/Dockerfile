# Use the official Python 3.9 image as the base image.
# Ensures a consistent Python environment for the application.
# References:
# - Dependency: Python 3.9 (external dependency)
# - Technical Specification/5.19 Feature ID: F-019 (Scalability and Reliability)
#   Ensures that the application performs efficiently under various conditions.
FROM python:3.9

# Set the working directory to /app
# Organizes application files for easy management within the container.
WORKDIR /app

# Copy the entire main server directory into the container's /app directory.
# Includes application code and all necessary resources.
COPY . /app

# Upgrade pip to version 21.1.3 and install dependencies from requirements.txt
# Ensures consistent dependency management across environments.
# References:
# - Dependency: pip 21.1.3 (external dependency)
# - Internal Dependency: requirements.txt (lists package dependencies)
# - Technical Specification/5.1 Feature ID: F-001 (Secure User Authentication and Role-Based Authorization)
#   Important packages for implementing secure login and authentication.
RUN pip install --upgrade pip==21.1.3 \
    && pip install -r requirements.txt

# Expose the application port 5000 for external access.
# Allows external clients to connect to the Flask application.
EXPOSE 5000

# Specify the command to run the Flask application using the app.py file.
# Starts the main server when the container is run.
# References:
# - Internal Dependency: app.py (initializes and configures the Flask application)
CMD ["python", "app.py"]