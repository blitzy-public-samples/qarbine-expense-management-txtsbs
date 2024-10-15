# Use the official Python 3.9 image as the base image
# External Dependency: Python 3.9 (Base image for running Python applications)
# Addressing: Technical Specification/5.3 Feature ID: F-003 - "Policy and Compliance Engine"
# Ensures the container has the necessary Python environment to run the policy engine application
FROM python:3.9

# Set the working directory in the container to /app
# Organizes the application files within the container
WORKDIR /app

# Copy the requirements.txt file into the container
# Internal Dependency: requirements.txt (Specifies Python dependencies to be installed in the Docker image)
COPY requirements.txt .

# Install the Python dependencies specified in requirements.txt
# External Dependency: Flask==2.0.1 (Version 2.0.1 - To create and manage API routes)
# Ensures all necessary packages are installed for the policy engine to perform real-time policy checks
# Addressing: Technical Specification/5.3 Feature ID: F-003
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire policy_engine directory into the container
# Internal Dependencies:
# - app.py (Main application file to be executed by the Docker container)
# - src/ (Source code for policy checks and applying regulations)
COPY . /app

# Set the environment variable FLASK_APP to app.py
# Configures Flask to run the application defined in app.py
ENV FLASK_APP=app.py

# Expose port 5000 for the Flask application
# Allows the Flask application to be accessible through port 5000
EXPOSE 5000

# Define the command to run the Flask application using flask run
# Runs the policy engine to ensure expenses adhere to company policies and tax regulations
# Addressing: Technical Specification/5.3 Feature ID: F-003
CMD ["flask", "run", "--host=0.0.0.0"]