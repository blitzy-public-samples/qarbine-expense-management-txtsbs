# External dependencies (Flask version 2.0.1)
from flask import Flask, request, jsonify, Blueprint
# Flask-JWT-Extended version 4.3.1
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

# Internal dependencies
from models import User, Expense, PolicyModel, ExpenseReportModel
from utils import (
    hash_and_store_password,
    verify_password,
    check_policy_compliance,
    validate_tax_compliance,
    send_notification,
    format_message,
    get_delivery_method,
    generate_timestamp,
    generate_expense_report
)

# Create a Blueprint for the main server routes
main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/register', methods=['POST'])
def register_user_route():
    """
    API route for registering a new user.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      (Technical Specification/5.1 Feature ID: F-001)
        - TR-F001.1 Implement secure login using unique username and password
        - TR-F001.4 Define role-based access levels
        - TR-F001.5 Provide password recovery and reset functionality
    """
    # Step 1: Extract user data from the request payload
    # Retrieves 'username', 'password', and 'role' from the JSON request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'Employee')  # Default role is 'Employee'

    # Step 2: Hash the user's password using hash_and_store_password utility
    # Ensures passwords are stored securely in the database
    hashed_password = hash_and_store_password(password)

    # Step 3: Create a new User instance with the provided data
    new_user = User(
        username=username,
        password=hashed_password,
        role=role
    )

    # Step 4: Save the User instance to the database
    try:
        new_user.save_to_db()
    except Exception as e:
        # Handles exceptions such as duplicate usernames
        return jsonify({'message': 'User registration failed', 'error': str(e)}), 400

    # Step 5: Generate a JWT token
    # Provides authentication token for the newly registered user
    access_token = create_access_token(identity=new_user.id)

    # Step 6: Return a success response with a generated JWT token
    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token
    }), 201

@main_routes.route('/login', methods=['POST'])
def login_user_route():
    """
    API route for user login.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      (Technical Specification/5.1 Feature ID: F-001)
        - TR-F001.1 Implement secure login using unique username and password
        - TR-F001.5 Provide password recovery and reset functionality
    """
    # Step 1: Extract login credentials from the request payload
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Step 2: Retrieve the User instance from the database using the provided username
    user = User.find_by_username(username)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Step 3: Verify the provided password using verify_password utility
    if not verify_password(password, user.password):
        # Password does not match
        return jsonify({'message': 'Invalid credentials'}), 401

    # Step 4: Generate a JWT token using create_access_token
    # Generates a token for authenticated user sessions
    access_token = create_access_token(identity=user.id)

    # Step 5: Return a success response with the JWT token
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token
    }), 200

@main_routes.route('/validate_expense', methods=['POST'])
@jwt_required()
def validate_expense_route():
    """
    API route to validate an expense against policy and tax rules.

    Addresses:
    - Policy and Compliance Engine
      (Technical Specification/5.3 Feature ID: F-003)
        - TR-F003.2 Perform real-time policy checks during expense submission
        - TR-F003.3 Integrate with global tax databases to ensure up-to-date tax compliance
        - TR-F003.5 Flag expenses that exceed policy limits or require additional approval
    """
    # Step 1: Parse the incoming request to extract expense data
    expense_data = request.get_json()

    # Step 2: Load the relevant policy and tax models using PolicyModel
    # Retrieves current policies and tax regulations
    policies = PolicyModel.get_current_policies()

    # Step 3: Validate the expense against policy rules using check_policy_compliance
    policy_compliance_result = check_policy_compliance(expense_data, policies)

    # Step 4: Validate the expense against tax rules using validate_tax_compliance
    tax_compliance_result = validate_tax_compliance(expense_data)

    # Step 5: Return a JSON response with the compliance status and any violations
    compliance_status = {
        'policy_compliant': policy_compliance_result['is_compliant'],
        'policy_violations': policy_compliance_result['violations'],
        'tax_compliant': tax_compliance_result['is_compliant'],
        'tax_violations': tax_compliance_result['violations'],
    }

    return jsonify({'compliance_status': compliance_status}), 200

@main_routes.route('/send_notification', methods=['POST'])
def send_notification_route():
    """
    API route for sending notifications.

    Addresses:
    - Notification and Alerting System
      (Technical Specification/5.17 Feature ID: F-017)
        - TR-F017.1 Send email and in-app notifications for pending expense approvals
        - TR-F017.4 Inform users of successful reimbursements and payment completions
        - TR-F017.6 Allow users to configure their notification preferences
    """
    # Step 1: Log the request to send a notification
    # Records the incoming notification request for auditing
    from app import app  # Assuming 'app' is defined in 'app.py'
    app.logger.info('Received request to send notification')

    # Step 2: Extract user_id and message from the request payload
    data = request.get_json()
    user_id = data.get('user_id')
    message = data.get('message')

    # Step 3: Create a Notification instance with the provided user_id and message
    notification = {
        'user_id': user_id,
        'message': message
    }

    # Step 4: Format the message using format_message
    formatted_message = format_message(notification['message'])

    # Step 5: Determine the delivery method using get_delivery_method
    delivery_method = get_delivery_method(user_id)

    # Step 6: Generate a timestamp using generate_timestamp
    timestamp = generate_timestamp()

    # Step 7: Send the notification and log the result
    send_status = send_notification(
        user_id=user_id,
        message=formatted_message,
        method=delivery_method,
        timestamp=timestamp
    )
    app.logger.info(
        f'Notification sent to user {user_id} via {delivery_method} at {timestamp}'
    )

    # Step 8: Return the status of the send operation
    return jsonify({
        'message': 'Notification sent successfully',
        'status': send_status
    }), 200

@main_routes.route('/reports/<int:report_id>', methods=['GET'])
@jwt_required()
def get_expense_report_route(report_id):
    """
    API route to retrieve a specific expense report by ID.

    Addresses:
    - Reporting and Analytics
      (Technical Specification/5.6 Feature ID: F-006)
        - TR-F006.2 Generate detailed expense reports by employee, department, project, or cost center
        - TR-F006.4 Enable export of reports in multiple formats
    """
    # Step 1: Extract the report_id from the request URL
    # Already captured via the route parameter

    # Step 2: Query the database for the expense report with the given report_id
    report = ExpenseReportModel.find_by_id(report_id)
    if not report:
        return jsonify({'message': 'Expense report not found'}), 404

    # Step 3: Convert the report data to a dictionary using to_dict()
    report_data = report.to_dict()

    # Step 4: Return the report data as a JSON response
    return jsonify({'expense_report': report_data}), 200