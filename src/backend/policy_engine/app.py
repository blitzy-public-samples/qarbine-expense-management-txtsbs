# src/backend/policy_engine/app.py

# External imports
from flask import Flask  # Flask version 2.0.1 - To create and manage API routes

# Internal imports
from .config import Config  # To load configuration settings for database connections and rules paths
from .src.models import PolicyModel  # To represent and manage policy data structures and validation logic
from .src.utils import validate_policy_compliance  # To validate expenses against policy models
from .src.rules.policy_rules import apply_policy_rules  # To apply policy rules to expenses
from .src.rules.tax_rules import apply_tax_rules  # To apply tax rules to expenses
from .src.routes import validate_expense_route  # To handle API requests for validating expenses

# Initialize the Flask application
app = Flask(__name__)  # Global Flask application instance used throughout the policy engine

def create_app():
    """
    Initializes the Flask application and sets up the necessary configurations and routes.

    Requirements Addressed:
    - Policy and Compliance Engine
      - Location: Technical Specification/5.3 Feature ID: F-003
      - Description:
        Ensures that all submitted expenses adhere to configurable company policies and international tax laws
        by performing real-time policy checks and applying relevant regulations automatically.

    Returns:
        app (Flask): The initialized Flask application instance.
    """

    # Step 1: Initialize the Flask application instance
    # (Already initialized globally as 'app = Flask(__name__)')
    # The Flask application serves as the central component that routes requests and manages responses.

    # Step 2: Load configuration settings using the config module
    # This sets up configurations such as database connections and paths to policy and tax rules,
    # ensuring the application operates with the correct parameters.
    app.config.from_object(Config)

    # Step 3: Register API routes
    # The 'validate_expense_route' blueprint includes the endpoints required for validating expenses.
    # By registering it with the Flask app, we make these endpoints available to clients.
    app.register_blueprint(validate_expense_route)

    # Step 4: Return the initialized Flask application instance
    return app

# Initialize the application using create_app function to ensure all configurations and routes are set up
create_app()

# Entry point for running the application directly
if __name__ == '__main__':
    # Start the Flask development server
    # Note: In production, a WSGI server like Gunicorn or uWSGI should be used instead
    app.run(debug=True)  # Debug mode is enabled for development purposes