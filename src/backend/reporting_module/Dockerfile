# Dockerfile for the Reporting Module
# This Dockerfile builds the Docker image for the Reporting Module.
# It sets up the environment, installs dependencies, and defines the entry point for the reporting service.
# Addresses Requirement: Feature ID F-006 in Technical Specification/5.6
# "Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles."
# Technical Requirements Addressed:
# - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
# - TR-F006.3: Perform trend analysis on travel spending.
# - TR-F006.6: Integrate with business intelligence tools for advanced analytics.

# Use the official Python 3.9-slim base image
# Python version 3.9 is specified to ensure compatibility with data analysis libraries.
FROM python:3.9-slim

# Set the working directory inside the Docker container to /app
# This is where the application code will reside.
WORKDIR /app

# Copy the requirements.txt file into the Docker image
# The requirements.txt lists all Python dependencies required by the Reporting Module.
COPY requirements.txt ./

# Install the Python dependencies listed in requirements.txt using pip
# This ensures all necessary libraries for data processing and reporting are installed.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code into the Docker image
# Includes app.py and all other source files necessary for the reporting service.
COPY . ./

# Define the default command to run the application
# Starts the reporting service by running app.py, which initializes report generation and analytics features.
CMD ["python", "app.py"]