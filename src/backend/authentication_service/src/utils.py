# External dependencies
# bcrypt==3.2.0
import bcrypt  # Password hashing and verification.

# PyJWT==2.3.0
import jwt  # JWT token generation and validation.

# Internal dependency
from ..config import SECRET_KEY  # Used for encoding and decoding JWT tokens.

def hash_password(password):
    """
    Hashes a plain text password using bcrypt.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      - Location: Technical Specification/5.1 Feature ID: F-001
        - TR-F001.1: Implement secure login using unique username and password.

    Parameters:
    - password (str): The plain text password to hash.

    Returns:
    - str: The hashed password.
    """
    # Use bcrypt to generate a salt.
    salt = bcrypt.gensalt()
    # Hash the password with the generated salt.
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    # Return the hashed password.
    return hashed_password.decode('utf-8')

def verify_password(password, hashed_password):
    """
    Verifies a plain text password against a hashed password.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      - Location: Technical Specification/5.1 Feature ID: F-001
        - TR-F001.1: Implement secure login using unique username and password.

    Parameters:
    - password (str): The plain text password to verify.
    - hashed_password (str): The hashed password to compare against.

    Returns:
    - bool: True if the password matches, False otherwise.
    """
    # Use bcrypt to compare the plain text password with the hashed password.
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def generate_token(user_payload):
    """
    Generates a JWT token for a given user payload.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      - Location: Technical Specification/5.1 Feature ID: F-001
        - TR-F001.1: Implement secure login using unique username and password.
        - TR-F001.4: Define role-based access levels.

    Parameters:
    - user_payload (dict): The user information to encode into the token.

    Returns:
    - str: The generated JWT token.
    """
    # Encode the user payload using PyJWT with the SECRET_KEY.
    token = jwt.encode(user_payload, SECRET_KEY, algorithm='HS256')
    # Return the generated JWT token.
    return token

def validate_token(token):
    """
    Validates a JWT token and returns the decoded payload.

    Addresses:
    - Secure User Authentication and Role-Based Authorization
      - Location: Technical Specification/5.1 Feature ID: F-001
        - TR-F001.4: Define role-based access levels.

    Parameters:
    - token (str): The JWT token to validate.

    Returns:
    - dict: Decoded payload if the token is valid.

    Raises:
    - jwt.InvalidTokenError: If the token is invalid or expired.
    """
    # Decode the JWT token using PyJWT with the SECRET_KEY.
    decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    # Return the decoded payload if the token is valid.
    return decoded_payload