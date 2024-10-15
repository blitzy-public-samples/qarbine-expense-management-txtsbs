"""
Utility functions for the main server component of the Global Employee Travel Expense Tracking App.
These functions support various operations such as password hashing, policy compliance checks,
notification sending, and expense report generation.
"""

# External imports
import bcrypt  # Version 3.2.0 - Password hashing for secure storage and verification
import jwt  # Version 2.3.0 - Version 2.3.0 - JWT token generation and validation for authentication
from datetime import datetime  # Built-in module - To handle date and time operations for notifications

# Internal imports
from src.backend.main_server.src.models import MainServerModel, User, Expense, Notification  # Main server data models
from src.backend.authentication_service.src.utils import hash_password  # Hashes a user's password using bcrypt
from src.backend.policy_engine.src.utils import check_policy_compliance as policy_engine_check_compliance  # Checks if an expense complies with the defined policies
from src.backend.notification_service.src.utils import send_notification as notification_service_send  # Sends a formatted notification message to a user
from src.backend.reporting_module.src.utils import generate_expense_report as reporting_module_generate_report  # Generates a report from processed expense data
from src.backend.main_server.src.database import db_session  # Database session for ORM operations

def hash_and_store_password(user: User, password: str) -> str:
    """
    Hashes a user's password and stores it securely in the database.

    Parameters:
        user (User): The user object to update with the hashed password.
        password (str): The plaintext password to hash.

    Returns:
        str: The hashed password.

    Addresses Requirement:
        - Secure User Authentication and Role-Based Authorization
          Location: Technical Specification/5.1 Feature ID: F-001
          Description: Implement secure login, multi-factor authentication, and role-based access levels.

    Steps:
        1. Use bcrypt to generate a salt.
        2. Hash the password with the generated salt.
        3. Store the hashed password in the user's record in the database.
        4. Commit the changes to the database.
        5. Return the hashed password.
    """
    # Step 1: Use bcrypt to generate a salt
    salt = bcrypt.gensalt()
    # Step 2: Hash the password with the generated salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    # Step 3: Store the hashed password in the user's record
    user.password_hash = hashed_password.decode('utf-8')  # Assuming 'password_hash' field exists in User model
    # Step 4: Commit the changes to the database
    db_session.add(user)
    db_session.commit()
    # Step 5: Return the hashed password
    return hashed_password.decode('utf-8')

def check_policy_compliance(expense: Expense) -> bool:
    """
    Checks if an expense complies with the defined policies.

    Parameters:
        expense (Expense): The expense object to check.

    Returns:
        bool: True if the expense complies with all policy rules, otherwise False.

    Addresses Requirement:
        - Policy and Compliance Engine
          Location: Technical Specification/5.3 Feature ID: F-003
          Description: Ensures that all submitted expenses adhere to configurable company policies and international tax laws by performing real-time policy checks and applying relevant regulations automatically.

    Steps:
        1. Retrieve the list of active policy rules.
        2. Iterate over each rule in the policy.
        3. Check if the expense satisfies the current rule using 'apply' method.
        4. If any rule is violated, return False.
        5. If all rules are satisfied, return True.
    """
    # Step 1: Retrieve the list of active policy rules
    from src.backend.policy_engine.src.models import PolicyRule  # Assuming PolicyRule model exists
    policy_rules = PolicyRule.get_all_active_rules()
    # Step 2: Iterate over each rule in the policy
    for rule in policy_rules:
        # Step 3: Check if the expense satisfies the current rule using 'apply' method
        if not rule.apply(expense):
            # Step 4: If any rule is violated, return False
            return False
    # Step 5: If all rules are satisfied, return True
    return True

def send_notification(notification: Notification) -> str:
    """
    Sends a formatted notification message to a user.

    Parameters:
        notification (Notification): The notification object containing message content and user information.

    Returns:
        str: Status message indicating the result of the notification send operation.

    Addresses Requirement:
        - Notification and Alerting System
          Location: Technical Specification/5.17 Feature ID: F-017
          Description: Develops a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.

    Steps:
        1. Format the notification message.
        2. Determine the delivery methods based on user preferences.
        3. Send the notification using the selected delivery methods.
        4. Aggregate the results of sending notifications.
        5. Return the status message.
    """
    # Step 1: Format the notification message
    message = notification.format_message()
    # Step 2: Determine the delivery methods based on user preferences
    user = notification.user
    user_preferences = user.get_notification_preferences()  # Assumes method exists in User model
    delivery_methods = user_preferences.get('delivery_methods', ['email'])
    # Step 3: Send the notification using the selected delivery methods
    status_messages = []
    for method in delivery_methods:
        if method == 'email':
            result = notification_service_send.send_email(user.email, message)
        elif method == 'sms':
            result = notification_service_send.send_sms(user.phone_number, message)
        elif method == 'in_app':
            result = notification_service_send.send_in_app(user.id, message)
        else:
            result = f'Unsupported delivery method: {method}'
        status_messages.append(result)
    # Step 4: Aggregate the results of sending notifications
    status = '; '.join(status_messages)
    # Step 5: Return the status message
    return status

def generate_expense_report(processed_data: list) -> dict:
    """
    Generates a report from processed expense data.

    Parameters:
        processed_data (list): A list of processed expense data dictionaries.

    Returns:
        dict: A dictionary containing the generated report data.

    Addresses Requirement:
        - Reporting and Analytics
          Location: Technical Specification/5.6 Feature ID: F-006
          Description: Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles.

    Steps:
        1. Process the raw expense data if necessary.
        2. Generate summary statistics from the processed data.
        3. Compile the report data into a dictionary format.
        4. Include metadata such as generation time.
        5. Return the generated report data.
    """
    # Step 1: Process the raw expense data if necessary
    # Assuming 'processed_data' is already processed; otherwise, include processing logic here
    # Step 2: Generate summary statistics from the processed data
    total_expense = sum(item.get('amount', 0) for item in processed_data)
    expense_count = len(processed_data)
    average_expense = total_expense / expense_count if expense_count > 0 else 0
    expenses_by_category = {}
    for item in processed_data:
        category = item.get('category', 'Uncategorized')
        expenses_by_category[category] = expenses_by_category.get(category, 0) + item.get('amount', 0)
    # Step 3: Compile the report data into a dictionary format
    report_data = {
        'total_expense': total_expense,
        'average_expense': average_expense,
        'expense_count': expense_count,
        'expenses_by_category': expenses_by_category,
    }
    # Step 4: Include metadata such as generation time
    report_data['generated_at'] = datetime.utcnow().isoformat() + 'Z'  # ISO 8601 format
    # Step 5: Return the generated report data
    return report_data