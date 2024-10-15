"""
Configuration file for the Notification Service.

This file is responsible for setting up logging and other service-wide configurations.
Addresses requirements from Technical Specification/5.17 Feature ID: F-017, specifically:

- TR-F017.1: Configure logging to support the notification and alerting system by setting up appropriate logging levels and handlers.

Dependencies:
- os (builtin): To access environment variables for configuration settings.
- logging (builtin): To configure and manage logging for the service.

Author: Notification Service Team
Date: 2023-10-04
"""

import os  # Built-in module for accessing environment variables (Python 3.10)
import logging  # Built-in module for logging purposes (Python 3.10)

# Global variable defining the logging level for the notification service.
# The log level can be set via the 'NOTIFICATION_SERVICE_LOG_LEVEL' environment variable.
# If not set, it defaults to 'INFO'.
# This addresses TR-F017.1 in Technical Specification/5.17 Feature ID: F-017.
LOG_LEVEL = os.getenv('NOTIFICATION_SERVICE_LOG_LEVEL', 'INFO')

# Global variable defining the path to the log file for the notification service.
# The log file path can be set via the 'NOTIFICATION_SERVICE_LOG_FILE' environment variable.
# If not set, it defaults to 'logs/notification_service.log'.
# This supports persistent logging for auditing and troubleshooting.
LOG_FILE = os.getenv('NOTIFICATION_SERVICE_LOG_FILE', 'logs/notification_service.log')


def setup_logging(log_level: str = LOG_LEVEL, log_file: str = LOG_FILE) -> None:
    """
    Configures the logging settings for the notification service, including log level and format.

    This function sets up logging according to enterprise standards, ensuring that all logs are properly formatted
    and directed to the appropriate output destinations, including both console and log files. It supports dynamic
    log level and log file path configuration via environment variables or parameters.

    Addresses:
    - TR-F017.1 in Technical Specification/5.17 Feature ID: F-017:
      "Send email and in-app notifications for pending expense approvals."
      Proper logging is crucial for monitoring the notification service's operations and for troubleshooting.

    Parameters:
    - log_level (str): The logging level to set for the service (e.g., 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL').
    - log_file (str): The path to the log file where logs will be stored.

    Returns:
    - None

    Steps:
    1. Retrieve the log level from environment variables or use a default value.
    2. Convert the log level string to a logging level object.
    3. Create a formatter for consistent log message formatting.
    4. Set up console handler with the specified log level and format.
    5. Set up file handler with the specified log level and format, ensuring the log directory exists.
    6. Add handlers to the root logger after clearing any existing handlers.
    """
    # Step 1: Retrieve the log level from environment variables or use the default value
    log_level = log_level.upper() if log_level else 'INFO'

    # Step 2: Convert the log level string to a logging level object
    # Use getattr to safely get the logging level attribute
    level = getattr(logging, log_level, logging.INFO)

    # Step 3: Create a formatter for consistent log message formatting
    formatter = logging.Formatter(
        fmt='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    # Step 4: Set up console handler with the specified log level and format
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)
    console_handler.setFormatter(formatter)

    # Step 5: Set up file handler with the specified log level and format, ensuring the log directory exists
    file_handler = None
    if log_file:
        try:
            # Ensure that the directory for the log file exists
            os.makedirs(os.path.dirname(log_file), exist_ok=True)
            file_handler = logging.FileHandler(log_file)
            file_handler.setLevel(level)
            file_handler.setFormatter(formatter)
        except Exception as e:
            # If file handler cannot be set up, log the error and proceed with console logging only
            logging.error("Failed to set up file logging: %s", e)

    # Step 6: Add handlers to the root logger after clearing any existing handlers
    root_logger = logging.getLogger()
    root_logger.setLevel(level)
    root_logger.handlers.clear()
    root_logger.addHandler(console_handler)
    if file_handler:
        root_logger.addHandler(file_handler)

    # Log that logging has been configured
    logger = logging.getLogger(__name__)
    logger.info("Logging has been configured with level: %s", log_level)
    if file_handler:
        logger.info("Logging to file: %s", log_file)
    else:
        logger.warning("File logging is not configured.")