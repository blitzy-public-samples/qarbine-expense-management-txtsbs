# Import necessary modules
import os  # Standard library for operating system interactions

"""
Configuration settings for the Authentication Service.
Includes settings for database connection, secret keys, and debug mode.

Addressing Requirement:
- Name: Secure User Authentication and Role-Based Authorization
- Location: Technical Specification/5.1 Feature ID: F-001
- Description: Implement secure login, multi-factor authentication, and role-based access levels.
"""

# Database connection string for ORM setup.
# Internal Dependency: DATABASE_URL from src/backend/authentication_service/config.py
# Purpose: Specifies the database URL for connecting to the authentication database.
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///default.db')

# Secret key for session management and token encoding.
# Internal Dependency: SECRET_KEY from src/backend/authentication_service/config.py
# Purpose: Used for securely signing the session cookie and other security-related functions.
SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret')

# Debug mode configuration for the application.
# Internal Dependency: DEBUG from src/backend/authentication_service/config.py
# Purpose: Determines if the application runs in debug mode; should be set to 'False' in production.
DEBUG = os.getenv('DEBUG', 'False')