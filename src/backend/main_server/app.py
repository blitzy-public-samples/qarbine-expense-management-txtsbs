# External dependencies
from flask import Flask  # Flask==2.0.1
from flask_sqlalchemy import SQLAlchemy  # SQLAlchemy==1.4.25
from flask_jwt_extended import JWTManager  # Flask-JWT-Extended==4.3.1

# Internal dependencies
from config import load_config  # Internal: Loads configuration settings for the main server.
from src.models import MainServerModel  # Internal: Represents the main server data model.
from src.utils import (
    hash_and_store_password,  # Internal: Hashes and stores a user's password securely.
    check_policy_compliance,  # Internal: Checks if an expense complies with defined policies.
    send_notification,        # Internal: Sends a formatted notification message to a user.
    generate_expense_report   # Internal: Generates a report from processed expense data.
)

# Importing routes from other backend services
from authentication_service.src.routes import auth_bp  # Internal: Authentication service routes.
from policy_engine.src.routes import policy_bp          # Internal: Policy engine service routes.
from notification_service.src.routes import notification_bp  # Internal: Notification service routes.
from reporting_module.src.routes import reporting_bp          # Internal: Reporting module routes.

# Initialize the Flask application
app = Flask(__name__)

# Initialize the database connection
db = SQLAlchemy()  # Will be initialized with the app in the initialize_main_server function.

# Initialize JWT Manager for handling authentication tokens
jwt = JWTManager()

def initialize_main_server():
    """
    Initializes the main server application by setting up configurations, routes, and integrating backend services.

    Requirements Addressed:
    - Secure User Authentication and Role-Based Authorization
      (Technical Specification/5.1 Feature ID: F-001)
    - Expense Submission
      (Technical Specification/5.2 Feature ID: F-002)
    - Policy and Compliance Engine
      (Technical Specification/5.3 Feature ID: F-003)
    - Notification and Alerting System
      (Technical Specification/5.17 Feature ID: F-017)
    - Reporting and Analytics
      (Technical Specification/5.6 Feature ID: F-006)

    Returns:
        app (Flask): The initialized Flask application instance.
    """

    # Step 1: Load configuration settings using load_config.
    # This addresses system configuration management and ensures that settings like database URIs,
    # secret keys, and other environment-specific configurations are appropriately loaded.
    config = load_config()
    app.config.update(config)

    # Step 2: Initialize extensions with the Flask app.
    # Initialize the SQLAlchemy database connection using the app configurations.
    db.init_app(app)
    # Initialize JWT Manager for handling secure user authentication tokens.
    jwt.init_app(app)
    # These initializations satisfy the requirement for secure user authentication and token management.
    # (Technical Specification/5.1 Feature ID: F-001)

    # Step 3: Set up the database connection using SQLAlchemy.
    # The database models defined in src.models will be associated with this database instance.
    # This step ensures that all database operations are routed through SQLAlchemy ORM,
    # providing a layer of abstraction and facilitating data integrity.
    # (Technical Specification/6.3.3 Data Storage)

    # Step 4: Register API routes for user registration, login, expense validation,
    # notification sending, and report retrieval.

    # Register authentication routes for user registration and login.
    app.register_blueprint(auth_bp)
    # Requirements Addressed:
    # - Secure User Authentication and Role-Based Authorization
    #   (Technical Specification/5.1 Feature ID: F-001)

    # Register policy validation routes for validating expenses against policies.
    app.register_blueprint(policy_bp)
    # Requirements Addressed:
    # - Policy and Compliance Engine
    #   (Technical Specification/5.3 Feature ID: F-003)

    # Register notification routes for sending notifications to users.
    app.register_blueprint(notification_bp)
    # Requirements Addressed:
    # - Notification and Alerting System
    #   (Technical Specification/5.17 Feature ID: F-017)

    # Register reporting routes for generating and retrieving expense reports.
    app.register_blueprint(reporting_bp)
    # Requirements Addressed:
    # - Reporting and Analytics
    #   (Technical Specification/5.6 Feature ID: F-006)

    # Additional routes can be registered here as needed for other functionalities.

    # Step 5: Integrate authentication, policy compliance, notification, and reporting services.
    # The integration is achieved through the registration of blueprints, enabling the main server
    # to communicate with different backend services seamlessly.
    # This step ensures the system integrations facilitate consistent data flow and operational efficiency.
    # (Technical Specification/5.9 Feature ID: F-009)

    # Step 6: Return the initialized Flask application instance.
    return app

# Run the application if this file is executed directly.
if __name__ == "__main__":
    # Initialize the main server application.
    app = initialize_main_server()
    # Run the Flask development server.
    # Note: In a production environment, use a WSGI server like Gunicorn or uWSGI.
    app.run(host='0.0.0.0', port=5000, debug=True)