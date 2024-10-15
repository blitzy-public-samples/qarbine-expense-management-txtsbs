import os

# External dependencies
from flask import Flask  # Flask version 2.0.1
from sqlalchemy import create_engine  # SQLAlchemy version 1.4.25

# Internal dependencies
from src.backend.main_server.src.models import MainServerModel  # Represents the main server data model, integrating various components such as users, policies, notifications, and expense reports.
from src.backend.main_server.app import initialize_main_server  # Initializes the main server application, setting up configurations, routes, and integrating various backend services.

# Configuration file for the main server component of the Global Employee Travel Expense Tracking App.
# This configuration manages environment variables, database connections, and other settings required for the server's operation.
# It addresses the following requirements:
# - Data Management (Technical Specification/5.10 Feature ID: F-010): Ensures secure and efficient management of all data within the application.
# - Secure User Authentication and Role-Based Authorization (Technical Specification/5.1 Feature ID: F-001): Implements secure login and role-based access levels.
# - System Integrations (Technical Specification/5.9 Feature ID: F-009): Facilitates seamless integration with existing systems.

# Global configuration variables

# DATABASE_URI: Environment variable for the database connection string.
# Retrieves the database URI from the environment to configure the database connection securely.
# Addresses Data Management requirements (Technical Specification/5.10 Feature ID: F-010).
DATABASE_URI = os.getenv('DATABASE_URI')

# SECRET_KEY: Environment variable for the application's secret key.
# Retrieves the secret key from the environment for session management and security.
# Addresses Secure User Authentication requirements (Technical Specification/5.1 Feature ID: F-001).
SECRET_KEY = os.getenv('SECRET_KEY')

def load_config():
    """
    Loads configuration settings from environment variables and sets up the application configuration.

    Returns:
        dict: A dictionary containing the loaded configuration settings.

    This function addresses the following requirements:
    - Data Management (Technical Specification/5.10 Feature ID: F-010)
    - Secure User Authentication and Role-Based Authorization (Technical Specification/5.1 Feature ID: F-001)
    - System Integrations (Technical Specification/5.9 Feature ID: F-009)

    Steps:
    1. Retrieve environment variables for database URI and secret key.
    2. Set the Flask configuration using the retrieved values.
    3. Return the configuration settings as a dictionary.
    """
    # Step 1: Retrieve environment variables for database URI and secret key.
    # Ensuring that sensitive configuration is loaded securely from the environment.
    db_uri = os.getenv('DATABASE_URI')
    secret_key = os.getenv('SECRET_KEY')

    # Validate that essential environment variables are set.
    if not db_uri:
        raise EnvironmentError('DATABASE_URI environment variable not set.')
    if not secret_key:
        raise EnvironmentError('SECRET_KEY environment variable not set.')

    # Step 2: Set the Flask configuration using the retrieved values.
    # Configure the application to use the database and secure sessions.
    config = {
        'SQLALCHEMY_DATABASE_URI': db_uri,
        'SECRET_KEY': secret_key,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,  # Disables the event system to save resources.
    }

    # Step 3: Return the configuration settings as a dictionary.
    return config