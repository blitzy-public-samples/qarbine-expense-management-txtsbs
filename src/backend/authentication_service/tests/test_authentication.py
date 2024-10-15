"""
Unit tests for the authentication service, verifying the functionality of user registration, login, and access to protected routes.

Requirements Addressed:
- Secure User Authentication and Role-Based Authorization
  - Location: Technical Specification/5.1 Feature ID: F-001
  - Description: Implement secure login, multi-factor authentication, and role-based access levels.
"""

# External Dependencies
import pytest  # Testing framework for writing and executing test cases. Version: 6.2.4
from flask_testing import TestCase  # Extension for testing Flask applications. Version: 0.8.1

# Internal Dependencies
from app import create_app  # Initialize the Flask application for testing.
from src.models import db, User  # User model for creating test users.
from src.utils import hash_password  # Utility function for hashing passwords in tests.
from src.routes import register_user, login_user, protected_route  # API routes for testing registration, login, and protected resources.

class TestAuthentication(TestCase):
    """
    Test suite for authentication functionalities: user registration, login, and access to protected routes.
    """

    def create_app(self):
        """
        Set up the test client using the Flask application.

        - Disables CSRF protection for testing purposes.
        - Uses an in-memory SQLite database for isolation.

        Related Requirements:
        - Ensures a secure testing environment.
        """
        app = create_app()
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False  # Disable CSRF for testing
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # In-memory database
        return app

    def setUp(self):
        """
        Prepare the database before each test.
        """
        db.create_all()

    def tearDown(self):
        """
        Clean up the database after each test.
        """
        db.session.remove()
        db.drop_all()

    @pytest.mark.parametrize('username, email, password', [
        ('testuser', 'testuser@example.com', 'TestPassword123!')
    ])
    def test_user_registration(self, username, email, password):
        """
        Tests the user registration endpoint to ensure users can be registered successfully.

        Steps:
        1. Set up the test client using the Flask application.
        2. Prepare a valid user registration payload.
        3. Send a POST request to the /register endpoint.
        4. Assert that the response status code is 201 (Created).
        5. Verify that the response contains a JWT token.

        Requirements Addressed:
        - Secure User Authentication and Role-Based Authorization
          - Location: Technical Specification/5.1 Feature ID: F-001
          - Description: Implement secure login, multi-factor authentication, and role-based access levels.
        """
        # 2. Prepare a valid user registration payload.
        payload = {
            'username': username,
            'email': email,
            'password': password
        }

        # 3. Send a POST request to the /register endpoint.
        response = self.client.post('/register', json=payload)

        # 4. Assert that the response status code is 201 (Created).
        assert response.status_code == 201

        # 5. Verify that the response contains a JWT token.
        data = response.get_json()
        assert 'token' in data
        assert data['token'] is not None

    @pytest.mark.parametrize('username, password', [
        ('testuser', 'TestPassword123!')
    ])
    def test_user_login(self, username, password):
        """
        Tests the user login endpoint to ensure users can log in and receive a JWT token.

        Steps:
        1. Set up the test client using the Flask application.
        2. Create a test user in the database with a known password.
        3. Prepare a valid login payload with the user's credentials.
        4. Send a POST request to the /login endpoint.
        5. Assert that the response status code is 200 (OK).
        6. Verify that the response contains a JWT token.

        Requirements Addressed:
        - Secure User Authentication and Role-Based Authorization
          - Location: Technical Specification/5.1 Feature ID: F-001
          - Description: Implement secure login, multi-factor authentication, and role-based access levels.
        """
        # 2. Create a test user in the database with a known password.
        hashed_password = hash_password(password)
        user = User(username=username, email='testuser@example.com', password=hashed_password)
        db.session.add(user)
        db.session.commit()

        # 3. Prepare a valid login payload with the user's credentials.
        payload = {
            'username': username,
            'password': password
        }

        # 4. Send a POST request to the /login endpoint.
        response = self.client.post('/login', json=payload)

        # 5. Assert that the response status code is 200 (OK).
        assert response.status_code == 200

        # 6. Verify that the response contains a JWT token.
        data = response.get_json()
        assert 'token' in data
        assert data['token'] is not None

    def test_protected_route_access(self):
        """
        Tests access to a protected route to ensure only authenticated users can access it.

        Steps:
        1. Set up the test client using the Flask application.
        2. Log in as a test user to obtain a JWT token.
        3. Send a GET request to the /protected endpoint with the JWT token.
        4. Assert that the response status code is 200 (OK) indicating access is granted.
        5. Send a GET request to the /protected endpoint without a JWT token.
        6. Assert that the response status code is 401 (Unauthorized) indicating access is denied.

        Requirements Addressed:
        - Secure User Authentication and Role-Based Authorization
          - Location: Technical Specification/5.1 Feature ID: F-001
          - Description: Implement secure login, multi-factor authentication, and role-based access levels.
        """
        # 2. Log in as a test user to obtain a JWT token.
        username = 'testuser'
        password = 'TestPassword123!'
        hashed_password = hash_password(password)
        user = User(username=username, email='testuser@example.com', password=hashed_password)
        db.session.add(user)
        db.session.commit()

        login_payload = {
            'username': username,
            'password': password
        }
        login_response = self.client.post('/login', json=login_payload)
        assert login_response.status_code == 200
        login_data = login_response.get_json()
        token = login_data.get('token')
        assert token is not None

        # 3. Send a GET request to the /protected endpoint with the JWT token.
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = self.client.get('/protected', headers=headers)

        # 4. Assert that the response status code is 200 (OK) indicating access is granted.
        assert response.status_code == 200

        # 5. Send a GET request to the /protected endpoint without a JWT token.
        unauthorized_response = self.client.get('/protected')

        # 6. Assert that the response status code is 401 (Unauthorized) indicating access is denied.
        assert unauthorized_response.status_code == 401