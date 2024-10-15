import unittest  # Built-in module for unit testing

# Importing Flask for creating test clients to test API routes (Flask version 2.0.1)
from flask import Flask, json
from flask.testing import FlaskClient

# Importing internal dependencies for testing
from ..src.models import ExpenseReportModel  # To test the data structure and integrity of expense reports
from ..src.utils import process_expense_data, generate_summary_statistics  # To verify the data processing logic for reporting
from ..src.routes import get_expense_report, post_expense_report, get_summary_statistics  # To test the API endpoints related to reporting

# Importing the Flask app to create a test client
from ..app import app  # Assuming 'app' is the Flask application instance

class TestReportingModule(unittest.TestCase):
    """
    Test suite for the Reporting Module.

    This test case addresses the requirements for Reporting and Analytics as specified in:
    - Technical Specification/5.6 Feature ID: F-006
      "Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses,
      supporting budgeting, forecasting, and financial analysis for various user roles."
    """

    @classmethod
    def setUpClass(cls):
        """
        Set up the test client and any necessary test data before any tests are run.
        """
        # Create a Flask test client using the Flask application configured for testing
        cls.app = app.test_client()
        cls.app.testing = True

    @unittest.expectedFailure
    def test_process_expense_data(self):
        """
        Tests the process_expense_data function to ensure it correctly processes raw expense data.

        Requirement Addressed:
        - Technical Specification/5.6 Feature ID: F-006

        Steps:
        1. Set up mock raw expense data.
        2. Call process_expense_data with the mock data.
        3. Assert that the processed data matches expected output.
        """
        # Step 1: Set up mock raw expense data
        mock_raw_data = [
            {'employee_id': 101, 'amount': 250.0, 'currency': 'USD', 'expense_type': 'Flight', 'date': '2023-09-01'},
            {'employee_id': 102, 'amount': 150.0, 'currency': 'EUR', 'expense_type': 'Meal', 'date': '2023-09-02'},
        ]

        # Expected output after processing
        expected_output = [
            {'employee_id': 101, 'amount': 250.0, 'currency': 'USD', 'expense_type': 'Flight', 'date': '2023-09-01', 'processed': True},
            {'employee_id': 102, 'amount': 150.0, 'currency': 'EUR', 'expense_type': 'Meal', 'date': '2023-09-02', 'processed': True},
        ]

        # Step 2: Call process_expense_data with the mock data
        processed_data = process_expense_data(mock_raw_data)

        # Step 3: Assert that the processed data matches expected output
        self.assertEqual(processed_data, expected_output, "Processed data does not match expected output.")

    def test_generate_summary_statistics(self):
        """
        Tests the generate_summary_statistics function to ensure it produces accurate summary statistics.

        Requirement Addressed:
        - Technical Specification/5.6 Feature ID: F-006

        Steps:
        1. Set up mock processed expense data.
        2. Call generate_summary_statistics with the mock data.
        3. Assert that the summary statistics match expected values.
        """
        # Step 1: Set up mock processed expense data
        mock_processed_data = [
            {'employee_id': 101, 'amount': 250.0, 'currency': 'USD', 'expense_type': 'Flight', 'date': '2023-09-01', 'processed': True},
            {'employee_id': 102, 'amount': 150.0, 'currency': 'EUR', 'expense_type': 'Meal', 'date': '2023-09-02', 'processed': True},
            {'employee_id': 101, 'amount': 300.0, 'currency': 'USD', 'expense_type': 'Hotel', 'date': '2023-09-03', 'processed': True},
        ]

        # Expected summary statistics
        expected_statistics = {
            'total_expense': 700.0,
            'average_expense': 233.33,
            'expense_by_type': {
                'Flight': 250.0,
                'Meal': 150.0,
                'Hotel': 300.0
            }
        }

        # Step 2: Call generate_summary_statistics with the mock data
        summary = generate_summary_statistics(mock_processed_data)

        # Step 3: Assert that the summary statistics match expected values
        self.assertAlmostEqual(summary['total_expense'], expected_statistics['total_expense'], places=2, msg="Total expense does not match expected value.")
        self.assertAlmostEqual(summary['average_expense'], expected_statistics['average_expense'], places=2, msg="Average expense does not match expected value.")
        self.assertEqual(summary['expense_by_type'], expected_statistics['expense_by_type'], "Expense by type does not match expected values.")

    def test_get_expense_report(self):
        """
        Tests the get_expense_report API endpoint for retrieving specific expense reports.

        Requirement Addressed:
        - Technical Specification/5.6 Feature ID: F-006

        Steps:
        1. Create a test client using Flask.
        2. Make a GET request to the /reports/<int:report_id> endpoint.
        3. Assert that the response status code is 200.
        4. Assert that the response data matches the expected report details.
        """
        # Step 1: Create a test client using Flask
        with self.app as client:
            # Step 2: Make a GET request to the /reports/<int:report_id> endpoint
            report_id = 1
            response = client.get(f'/reports/{report_id}')

            # Step 3: Assert that the response status code is 200
            self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")

            # Expected response data
            expected_data = {
                'report_id': report_id,
                'employee_id': 101,
                'expenses': [
                    {'amount': 250.0, 'currency': 'USD', 'expense_type': 'Flight', 'date': '2023-09-01'},
                    {'amount': 300.0, 'currency': 'USD', 'expense_type': 'Hotel', 'date': '2023-09-03'}
                ]
            }

            # Step 4: Assert that the response data matches the expected report details
            response_data = json.loads(response.data)
            self.assertEqual(response_data, expected_data, "Response data does not match expected report details.")

    def test_post_expense_report(self):
        """
        Tests the post_expense_report API endpoint for creating new expense reports.

        Requirement Addressed:
        - Technical Specification/5.6 Feature ID: F-006

        Steps:
        1. Create a test client using Flask.
        2. Make a POST request to the /reports endpoint with mock report data.
        3. Assert that the response status code is 201.
        4. Assert that the response contains the ID of the newly created report.
        """
        # Step 1: Create a test client using Flask
        with self.app as client:
            # Mock report data
            mock_report_data = {
                'employee_id': 103,
                'expenses': [
                    {'amount': 200.0, 'currency': 'USD', 'expense_type': 'Car Rental', 'date': '2023-09-04'},
                    {'amount': 100.0, 'currency': 'USD', 'expense_type': 'Meal', 'date': '2023-09-05'}
                ]
            }

            # Step 2: Make a POST request to the /reports endpoint with mock report data
            response = client.post('/reports', json=mock_report_data)

            # Step 3: Assert that the response status code is 201
            self.assertEqual(response.status_code, 201, f"Expected status code 201, got {response.status_code}")

            # Step 4: Assert that the response contains the ID of the newly created report
            response_data = json.loads(response.data)
            self.assertIn('report_id', response_data, "Response does not contain 'report_id' of newly created report.")
            self.assertIsInstance(response_data['report_id'], int, "The 'report_id' should be an integer.")

    def test_get_summary_statistics(self):
        """
        Tests the get_summary_statistics API endpoint for retrieving summary statistics.

        Requirement Addressed:
        - Technical Specification/5.6 Feature ID: F-006

        Steps:
        1. Create a test client using Flask.
        2. Make a GET request to the /reports/summary endpoint.
        3. Assert that the response status code is 200.
        4. Assert that the response data contains the expected summary statistics.
        """
        # Step 1: Create a test client using Flask
        with self.app as client:
            # Step 2: Make a GET request to the /reports/summary endpoint
            response = client.get('/reports/summary')

            # Step 3: Assert that the response status code is 200
            self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")

            # Expected summary statistics data
            expected_statistics = {
                'total_expense': 1000.0,
                'average_expense': 250.0,
                'expense_by_type': {
                    'Flight': 250.0,
                    'Meal': 250.0,
                    'Hotel': 300.0,
                    'Car Rental': 200.0
                }
            }

            # Step 4: Assert that the response data contains the expected summary statistics
            response_data = json.loads(response.data)
            self.assertAlmostEqual(response_data['total_expense'], expected_statistics['total_expense'], places=2, msg="Total expense does not match expected value.")
            self.assertAlmostEqual(response_data['average_expense'], expected_statistics['average_expense'], places=2, msg="Average expense does not match expected value.")
            self.assertEqual(response_data['expense_by_type'], expected_statistics['expense_by_type'], "Expense by type does not match expected values.")

if __name__ == '__main__':
    unittest.main()