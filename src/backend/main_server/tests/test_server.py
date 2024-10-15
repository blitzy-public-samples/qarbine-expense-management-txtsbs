import pytest  # pytest version 6.2.4
from flask import Flask, url_for, jsonify
from flask_testing import TestCase  # Flask-Testing version 0.8.1

# Internal dependencies
from src.backend.main_server.app import initialize_main_server  # Initialize the main server application for testing.
from src.backend.main_server.src.routes import (
    register_user_route,       # API route for registering a new user.
    login_user_route,          # API route for user login.
    validate_expense_route,    # API route to validate an expense against policy and tax rules.
    send_notification_route,   # API route for sending notifications.
    get_expense_report_route   # API route to retrieve a specific expense report by ID.
)


class MainServerTestCase(TestCase):
    """
    Test suite for the main server application, focusing on verifying the functionality of API routes,
    integration with backend services, and ensuring compliance with business logic and security requirements.

    Requirements Addressed:
    - Integration Testing (Feature ID: F-015)
      Location: Technical Specification/5.15 Feature ID: F-015
      Description: Validates the seamless integration of the application with existing systems such as accounting,
      HR, payroll, tax databases, and currency exchange rate providers to ensure data consistency and functional interoperability.
    """

    def create_app(self):
        """
        Creates and configures a new app instance for each test.
        Sets up the test client for the Flask application.
        """
        app = initialize_main_server()
        app.config['TESTING'] = True
        return app

    @pytest.mark.parametrize("test_data", [
        {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@example.com',
            'password': 'Password123!'
        }
    ])
    def test_register_user(self, test_data):
        """
        Tests the user registration API endpoint for successful user creation and response.

        Requirements Addressed:
        - Integration Testing (Feature ID: F-015)
          Location: Technical Specification/5.15 Feature ID: F-015
          Description: Validates the integration of user registration with backend systems.

        Steps:
        1. Set up the test client for the Flask application.
        2. Define test data for a new user registration.
        3. Send a POST request to the register_user_route with the test data.
        4. Assert that the response status code is 201 (Created).
        5. Assert that the response contains a valid JWT token.
        """
        # Send a POST request to the register_user_route with the test data
        response = self.client.post(
            url_for('register_user_route'),
            json=test_data
        )

        # Assert that the response status code is 201 (Created)
        assert response.status_code == 201, f"Expected status code 201, got {response.status_code}"

        # Assert that the response contains a valid JWT token
        data = response.get_json()
        assert 'token' in data, "Response JSON does not contain 'token'"
        assert isinstance(data['token'], str), "Token is not a string"

    @pytest.mark.parametrize("test_data", [
        {
            'email': 'johndoe@example.com',
            'password': 'Password123!'
        }
    ])
    def test_login_user(self, test_data):
        """
        Tests the user login API endpoint for successful authentication and token issuance.

        Requirements Addressed:
        - Integration Testing (Feature ID: F-015)
          Location: Technical Specification/5.15 Feature ID: F-015
          Description: Validates the integration of user login with authentication services.

        Steps:
        1. Set up the test client for the Flask application.
        2. Define test data for user login credentials.
        3. Send a POST request to the login_user_route with the test data.
        4. Assert that the response status code is 200 (OK).
        5. Assert that the response contains a valid JWT token.
        """
        # Ensure the user exists by registering first
        self.client.post(
            url_for('register_user_route'),
            json={
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'johndoe@example.com',
                'password': 'Password123!'
            }
        )

        # Send a POST request to the login_user_route with the test data
        response = self.client.post(
            url_for('login_user_route'),
            json=test_data
        )

        # Assert that the response status code is 200 (OK)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Assert that the response contains a valid JWT token
        data = response.get_json()
        assert 'token' in data, "Response JSON does not contain 'token'"
        assert isinstance(data['token'], str), "Token is not a string"

    @pytest.mark.parametrize("test_data", [
        {
            'expense_date': '2023-01-01',
            'category': 'Meals',
            'amount': 50.00,
            'currency': 'USD',
            'description': 'Business lunch with client',
            'receipt': 'base64encodedstring'
        }
    ])
    def test_validate_expense(self, test_data):
        """
        Tests the expense validation API endpoint for compliance with policy and tax rules.

        Requirements Addressed:
        - Integration Testing (Feature ID: F-015)
          Location: Technical Specification/5.15 Feature ID: F-015
          Description: Validates the integration of expense validation with policy and tax systems.

        Steps:
        1. Set up the test client for the Flask application.
        2. Define test data for an expense submission.
        3. Send a POST request to the validate_expense_route with the test data.
        4. Assert that the response status code is 200 (OK).
        5. Assert that the response indicates compliance status and any violations.
        """
        # Send a POST request to the validate_expense_route with the test data
        response = self.client.post(
            url_for('validate_expense_route'),
            json=test_data
        )

        # Assert that the response status code is 200 (OK)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Assert that the response indicates compliance status and any violations
        data = response.get_json()
        assert 'compliance_status' in data, "Response JSON does not contain 'compliance_status'"
        assert data['compliance_status'] in ['Compliant', 'Non-Compliant'], f"Invalid compliance status: {data['compliance_status']}"

    @pytest.mark.parametrize("test_data", [
        {
            'recipient_id': 1,
            'message': 'Your expense report has been approved.'
        }
    ])
    def test_send_notification(self, test_data):
        """
        Tests the notification sending API endpoint for successful message dispatch.

        Requirements Addressed:
        - Integration Testing (Feature ID: F-015)
          Location: Technical Specification/5.15 Feature ID: F-015
          Description: Validates the integration of the notification service with backend systems.

        Steps:
        1. Set up the test client for the Flask application.
        2. Define test data for a notification message.
        3. Send a POST request to the send_notification_route with the test data.
        4. Assert that the response status code is 200 (OK).
        5. Assert that the response contains a success status message.
        """
        # Send a POST request to the send_notification_route with the test data
        response = self.client.post(
            url_for('send_notification_route'),
            json=test_data
        )

        # Assert that the response status code is 200 (OK)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Assert that the response contains a success status message
        data = response.get_json()
        assert 'status' in data, "Response JSON does not contain 'status'"
        assert data['status'] == 'Success', f"Expected status 'Success', got {data['status']}"

    @pytest.mark.parametrize("report_id", [1])
    def test_get_expense_report(self, report_id):
        """
        Tests the expense report retrieval API endpoint for correct data fetching.

        Requirements Addressed:
        - Integration Testing (Feature ID: F-015)
          Location: Technical Specification/5.15 Feature ID: F-015
          Description: Validates the integration of expense report retrieval with backend systems.

        Steps:
        1. Set up the test client for the Flask application.
        2. Define a valid report_id for fetching an expense report.
        3. Send a GET request to the get_expense_report_route with the report_id.
        4. Assert that the response status code is 200 (OK).
        5. Assert that the response contains the correct expense report data.
        """
        # Create a mock expense report if necessary (assuming report_id 1 exists)
        # Send a GET request to the get_expense_report_route with the report_id
        response = self.client.get(
            url_for('get_expense_report_route', report_id=report_id)
        )

        # Assert that the response status code is 200 (OK)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Assert that the response contains the correct expense report data
        data = response.get_json()
        assert 'report_id' in data, "Response JSON does not contain 'report_id'"
        assert data['report_id'] == report_id, f"Expected report_id {report_id}, got {data['report_id']}"