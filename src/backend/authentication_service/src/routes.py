"""
This module defines the API routes for the authentication service, including user registration,
login, and protected endpoints.

Requirements Addressed:
- Secure User Authentication and Role-Based Authorization
  - Technical Specification/5.1 Feature ID: F-001
"""

# External dependencies
from flask import Flask, request, jsonify  # Flask web framework (version 2.0.1)
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)  # Flask-JWT-Extended (version 4.3.1)

# Internal dependencies
from models import User, Role  # User and Role models for handling user-related operations
from utils import (
    hash_password,
    verify_password,
    generate_token,
    validate_token
)  # Utility functions for password hashing, verification, and token management

# Initialize the Flask application
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with a secure key in production
jwt = JWTManager(app)

@app.route('/register', methods=['POST'])
def register_user():
    """
    API endpoint for user registration, creating a new user in the system.

    Requirements Addressed:
    - TR-F001.1: Implement secure login using unique username and password (High Priority)
      - Technical Specification/5.1 Feature ID: F-001
    - TR-F001.4: Define role-based access levels for Employees, Managers, Finance Team, and Administrators (High Priority)
      - Technical Specification/5.1 Feature ID: F-001

    Parameters:
    - request (FlaskRequest): The HTTP request containing user registration data.

    Returns:
    - JSONResponse: A JSON response indicating success or failure of the registration process.
    """
    try:
        # Step 1: Extract user data from the request payload.
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        role_name = data.get('role')

        # Input validation
        if not username or not password or not role_name:
            return jsonify({'message': 'Username, password, and role are required.'}), 400

        # Check if the username already exists in the system.
        if User.find_by_username(username):
            return jsonify({'message': 'User already exists.'}), 409

        # Step 2: Hash the user's password using hash_password utility.
        hashed_password = hash_password(password)

        # Step 3: Create a new User instance with the provided data.
        # Retrieve the Role instance based on role_name.
        role = Role.find_by_name(role_name)
        if not role:
            return jsonify({'message': 'Invalid role specified.'}), 400

        new_user = User(username=username, password=hashed_password, role_id=role.id)

        # Step 4: Save the User instance to the database.
        new_user.save_to_db()

        # Step 5: Generate a JWT token using generate_token utility.
        access_token = generate_token(identity=new_user.id)

        # Step 6: Return a success response with a generated JWT token.
        return jsonify({
            'message': 'User registered successfully.',
            'access_token': access_token
        }), 201

    except Exception as e:
        # Handle exceptions and return an error response.
        return jsonify({'message': 'An error occurred during registration.', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login_user():
    """
    API endpoint for user login, authenticating users and issuing JWT tokens.

    Requirements Addressed:
    - TR-F001.1: Implement secure login using unique username and password (High Priority)
      - Technical Specification/5.1 Feature ID: F-001
    - TR-F001.2: Implement multi-factor authentication (MFA) (High Priority)
      - Note: MFA implementation may require additional steps not covered in this route.

    Parameters:
    - request (FlaskRequest): The HTTP request containing login credentials.

    Returns:
    - JSONResponse: A JSON response with a JWT token if authentication is successful.
    """
    try:
        # Step 1: Extract login credentials from the request payload.
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Input validation
        if not username or not password:
            return jsonify({'message': 'Username and password are required.'}), 400

        # Step 2: Retrieve the User instance from the database using the provided username.
        user = User.find_by_username(username)
        if not user:
            return jsonify({'message': 'Invalid username or password.'}), 401

        # Step 3: Verify the provided password using verify_password utility.
        if not verify_password(password, user.password):
            return jsonify({'message': 'Invalid username or password.'}), 401

        # Step 4: Generate a JWT token using generate_token utility.
        access_token = generate_token(identity=user.id)

        # Step 5: Return a success response with the JWT token.
        return jsonify({
            'message': 'Login successful.',
            'access_token': access_token
        }), 200

    except Exception as e:
        # Handle exceptions and return an error response.
        return jsonify({'message': 'An error occurred during login.', 'error': str(e)}), 500

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    """
    Example of a protected API route that requires JWT authentication.

    Requirements Addressed:
    - TR-F001.4: Define role-based access levels (High Priority)
      - Technical Specification/5.1 Feature ID: F-001

    Parameters:
    - request (FlaskRequest): The HTTP request.

    Returns:
    - JSONResponse: A JSON response indicating access to the protected resource.
    """
    try:
        # Step 1: Validate the JWT token using validate_token utility.
        # Note: The @jwt_required() decorator automatically checks for a valid token.

        # Optionally, get the identity of the current user.
        current_user_id = get_jwt_identity()
        user = User.find_by_id(current_user_id)

        # Step 2: Return a response indicating successful access to the protected resource.
        return jsonify({
            'message': 'Access granted to protected resource.',
            'user': user.username
        }), 200

    except Exception as e:
        # Handle exceptions and return an error response.
        return jsonify({'message': 'An error occurred while accessing the protected resource.', 'error': str(e)}), 500