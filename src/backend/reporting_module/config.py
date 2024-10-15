import os  # Standard library module for accessing environment variables
import logging  # Standard library module for logging configuration

# Global configuration variables for the reporting module

# LOG_LEVEL: Defines the logging level for the module
# Retrieved from environment variables or defaults to 'DEBUG'
# Addresses logging requirements for detailed analysis and monitoring
# Related to Technical Specification/5.6 Feature ID: F-006,
# supporting real-time visibility and analysis (TR-F006.2, TR-F006.3)
LOG_LEVEL = os.getenv('LOG_LEVEL', 'DEBUG')

# DATABASE_URL: Database connection string
# Retrieved from environment variables to maintain flexibility across environments
# Essential for accessing expense data to generate reports
# Related to Technical Specification/5.6 Feature ID: F-006,
# enabling data retrieval for reporting functionalities (TR-F006.2, TR-F006.3)
DATABASE_URL = os.getenv('DATABASE_URL')

def setup_logging():
    """
    Configures the logging settings for the reporting module.

    Addresses requirements:
    - "Reporting and Analytics" (Technical Specification/5.6 Feature ID: F-006)
        - Supports the generation of detailed expense reports and trend analysis
          by ensuring that logging is properly configured for debugging and monitoring.
          Related Technical Requirements:
          - TR-F006.2: Generate detailed expense reports
          - TR-F006.3: Perform trend analysis on travel spending

    Steps:
    1. Retrieve the LOG_LEVEL from environment variables or use a default value.
    2. Configure the logging format and level using the logging module.
    3. Set up handlers for console and file logging if necessary.

    Returns:
        None
    """
    # Step 1: Retrieve the LOG_LEVEL from environment variables or use a default value
    log_level_str = os.getenv('LOG_LEVEL', LOG_LEVEL)
    log_level = getattr(logging, log_level_str.upper(), logging.DEBUG)

    # Step 2: Configure the logging format and level using the logging module
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Step 3: Set up handlers for console and file logging if necessary
    # Create console handler with appropriate log level
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)
    console_formatter = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(console_formatter)
    logging.getLogger('').addHandler(console_handler)

    # Set up file handler if LOG_FILE environment variable is set
    log_file = os.getenv('LOG_FILE')
    if log_file:
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(log_level)
        file_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        file_handler.setFormatter(file_formatter)
        logging.getLogger('').addHandler(file_handler)