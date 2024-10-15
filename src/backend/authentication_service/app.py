"""
Main application file for the authentication service.

Sets up the Flask application, configures routes, and initializes the database connection.

Requirements Addressed:
- Secure User Authentication and Role-Based Authorization
  (Technical Specification/5.1 Feature ID: F-001)
  - Implements secure login, multi-factor authentication, and role-based access levels.
"""

# External dependencies with versions
from flask import Flask  # Flask web framework (version 2.0.1)
from flask_sqlalchemy import SQLAlchemy  # SQLAlchemy integration with Flask (version 1.4.25)
from flask_jwt_extended import JWTManager  # Extension for handling JWT tokens (version 4.3.1)
import bcrypt  # Password hashing library (version 3.2.0)
import jwt  # Token generation and validation (PyJWT version 2.3.0)

# Internal dependencies
from src.backend.authentication_service.config import DATABASE_URL, SECRET_KEY, DEBUG  # Configuration settings
from src.backend.authentication_service.src.models import User, Role  # User and Role models
from src.backend.authentication_service.src.utils import (
    hash_password,
    verify_password,
    generate_token,
    validate_token,
)  # Utility functions for authentication
from src.backend.authentication_service.src.routes import (
    register_user,
    login_user,
    protected_route,
)  # API endpoints for authentication

# Global instances
app = Flask(__name__)  # Instantiate the Flask application

# Configure the application settings
app.config['DEBUG'] = DEBUG  # Debug mode configuration
app.config['SECRET_KEY'] = SECRET_KEY  # Secret key for session management and JWT encoding
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL  # Database connection string

# Initialize the database connection using SQLAlchemy
db = SQLAlchemy(app)  # Initialize SQLAlchemy with the Flask app

# Initialize JWT Manager for handling JWT tokens
jwt = JWTManager(app)

# Register API routes for authentication
app.register_blueprint(register_user)  # Register user registration routes
app.register_blueprint(login_user)     # Register user login routes
app.register_blueprint(protected_route)  # Register protected routes requiring authentication

def create_app():
    """
    Factory function to create and configure the Flask app.

    Steps:
    1. Initialize the Flask app with configuration settings.
    2. Set up the database connection using SQLAlchemy.
    3. Initialize JWT manager.
    4. Register API routes for user registration, login, and protected resources.
    5. Return the configured Flask app instance.

    Returns:
        app (Flask): Configured Flask application instance.

    Requirements Addressed:
    - Secure User Authentication and Role-Based Authorization
      (Technical Specification/5.1 Feature ID: F-001)
    """
    # Using the global 'app', 'db', and 'jwt' instances initialized above
    return app

# Entry point for running the application
if __name__ == "__main__":
    # Create the app instance
    application = create_app()

    # Run the application on the specified host and port
    application.run(host='0.0.0.0', port=5000)