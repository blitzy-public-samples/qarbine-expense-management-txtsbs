"""
Main application file for the Notification Service.

Responsible for initializing the service, setting up routes, and handling incoming requests related to notifications.

This module addresses the following requirements:

- Notification and Alerting System
  - Location: Technical Specification/5.17 Feature ID: F-017
  - Description: Develops a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.

Technical Requirements Addressed:
- TR-F017.1: Send email and in-app notifications for pending expense approvals.
- TR-F017.3: Alert managers of newly submitted expenses awaiting approval.
- TR-F017.6: Allow users to configure their notification preferences.
"""

import os  # Built-in module (Python 3.x standard library): To access environment variables for configuration settings.
import logging  # Built-in module (Python 3.x standard library): To configure and manage logging for the service.
from flask import Flask  # External module (Flask version 2.2.x): To create the Flask application instance.

from config import setup_logging  # Internal module: To configure logging for the notification service.
from src.models import Notification  # Internal module: To create and manage notification instances.
from src.utils import format_message, get_delivery_method, generate_timestamp  # Internal modules: To format messages, determine delivery methods, and generate timestamps.
from src.routes import send_notification  # Internal module: To handle the sending of notifications.

# Create Flask application instance at module level
app = Flask(__name__)
logging.info("Flask application instance created.")

def initialize_service():
    """
    Initializes the notification service by setting up logging, configuring routes, and preparing the service.

    Steps:
    1. Call setup_logging to configure the logging settings.
    2. Define API routes using the send_notification function.

    Returns:
        None: This function does not return a value.

    Requirements Addressed:
    - Feature: Notification and Alerting System
      - Location: Technical Specification/5.17 Feature ID: F-017
      - Description: Develops a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.
    """
    # Step 1: Configure logging settings
    # Addresses TR-F017.6 by initializing logging to monitor notification preferences and activities.
    setup_logging()
    logging.info("Logging has been configured successfully.")

    # Step 2: Define API routes using send_notification function
    # The send_notification route handles incoming notification requests.
    # Addresses TR-F017.1 and TR-F017.3 by setting up endpoints to send notifications for pending approvals and newly submitted expenses.
    app.add_url_rule('/notify', view_func=send_notification, methods=['POST'])
    logging.info("API routes have been configured.")

if __name__ == "__main__":
    # Initialize the service configuration
    initialize_service()

    # Step 3: Start the service to listen for incoming requests
    # Ensures that the notification service is running and ready to process incoming requests, fulfilling TR-F017.*
    port = int(os.environ.get('NOTIFICATION_SERVICE_PORT', 5000))
    app.run(host='0.0.0.0', port=port)
    logging.info(f"Notification service is running on port {port}.")