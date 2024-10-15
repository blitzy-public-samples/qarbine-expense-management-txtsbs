"""
Configuration file for the policy engine component of the Global Employee Travel Expense Tracking App.
This file is responsible for setting up configuration parameters such as database connections,
paths to policy and tax rules, and other environment-specific settings required for the policy engine to function correctly.
"""

import os
import json
import logging
from pathlib import Path

# External dependency:
from flask import Flask  # Flask version 2.0.1

# Set up logging for debugging and error tracking
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global configuration variables
# These variables address the requirements specified in Technical Specification/5.3 Feature ID: F-003,
# ensuring that the policy engine can perform real-time policy checks and apply relevant regulations automatically.

DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://user:password@localhost:5432/expense_db')
"""
DATABASE_URI:
The URI for connecting to the PostgreSQL database.
This variable is crucial for the policy engine to access necessary data for policy validation and tax compliance.
Addresses:
- TR-F003.1: Allow configuration of expense policies based on employee level, department, and travel destination.
Location: Technical Specification/5.3 Feature ID: F-003
"""

POLICY_RULES_PATH = os.getenv('POLICY_RULES_PATH', '/etc/expense_app/policy_rules.json')
"""
POLICY_RULES_PATH:
The file path where policy rules are stored.
This variable allows the policy engine to load company-specific expense policies.
Addresses:
- TR-F003.1 and TR-F003.2: Configuration of expense policies and performing real-time policy checks.
Location: Technical Specification/5.3 Feature ID: F-003
"""

TAX_RULES_PATH = os.getenv('TAX_RULES_PATH', '/etc/expense_app/tax_rules.json')
"""
TAX_RULES_PATH:
The file path where tax rules are stored.
This variable enables the policy engine to apply international tax regulations to expenses.
Addresses:
- TR-F003.3: Integrate with global tax databases to ensure up-to-date tax compliance.
Location: Technical Specification/5.3 Feature ID: F-003
"""

def load_configuration():
    """
    Loads configuration settings from environment variables or configuration files.

    Returns:
        dict: A dictionary containing configuration settings.

    This function addresses the following requirements:
    - TR-F003.1: Allow configuration of expense policies based on employee level, department, and travel destination.
    - TR-F003.2: Perform real-time policy checks during expense submission.
    - TR-F003.3: Integrate with global tax databases to ensure up-to-date tax compliance.
    Location: Technical Specification/5.3 Feature ID: F-003

    Steps:
    1. Read environment variables for database URI, policy rules path, and tax rules path.
    2. Load additional settings from a configuration file if available.
    3. Return a dictionary with all configuration settings.
    """
    # Step 1: Read configurations from environment variables (already assigned to global variables)
    config = {
        'DATABASE_URI': DATABASE_URI,
        'POLICY_RULES_PATH': POLICY_RULES_PATH,
        'TAX_RULES_PATH': TAX_RULES_PATH,
    }

    # Step 2: Load additional settings from a configuration file if available
    config_file_path = os.getenv('POLICY_ENGINE_CONFIG_FILE', '/etc/expense_app/policy_engine_config.json')
    if Path(config_file_path).is_file():
        logger.info(f"Loading configuration from {config_file_path}")
        try:
            with open(config_file_path, 'r') as config_file:
                file_config = json.load(config_file)
                config.update(file_config)
                logger.info("Configuration loaded successfully")
        except Exception as e:
            logger.error(f"Error loading configuration file: {e}")
    else:
        logger.info(f"No configuration file found at {config_file_path}, using default settings")

    # Step 3: Return the configuration dictionary
    return config