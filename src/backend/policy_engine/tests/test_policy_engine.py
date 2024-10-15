import unittest  # built-in module, used for writing and running tests

# Internal dependencies
from src.backend.policy_engine.src.models import PolicyModel
from src.backend.policy_engine.src.utils import validate_policy_compliance
from src.backend.policy_engine.src.rules.policy_rules import apply_policy_rules
from src.backend.policy_engine.src.rules.tax_rules import apply_tax_rules
from src.backend.policy_engine.src.routes import validate_expense_route

class PolicyEngineTestSuite(unittest.TestCase):
    """
    A test suite for the policy engine, containing tests for policy and tax compliance.

    Requirements Addressed:
    - Policy and Compliance Engine
      - Technical Specification/5.3 Feature ID: F-003
        - Ensures that all submitted expenses adhere to configurable company policies and international tax laws
          by performing real-time policy checks and applying relevant regulations automatically.
    """

    def setUp(self):
        """
        Initializes the test suite with necessary setup for testing policy and tax compliance.

        Steps:
        - Initialize any required test data or configurations.
        """
        # Test data for policy compliance
        self.expense_compliant = {
            'amount': 75.00,
            'category': 'Meals',
            'currency': 'USD',
            'date': '2024-01-15',
            'employee_level': 'Staff',
            'location': 'US',
            'description': 'Business lunch with clients'
        }

        self.expense_non_compliant = {
            'amount': 500.00,
            'category': 'Entertainment',
            'currency': 'USD',
            'date': '2024-01-16',
            'employee_level': 'Staff',
            'location': 'US',
            'description': 'Concert tickets'
        }

        # Test data for tax compliance
        self.expense_tax_compliant = {
            'amount': 200.00,
            'category': 'Lodging',
            'currency': 'EUR',
            'date': '2024-02-10',
            'employee_level': 'Manager',
            'location': 'DE',
            'description': 'Hotel stay during conference'
        }

        self.expense_tax_non_compliant = {
            'amount': 1000.00,
            'category': 'Gifts',
            'currency': 'GBP',
            'date': '2024-02-12',
            'employee_level': 'Manager',
            'location': 'UK',
            'description': 'Expensive gift to client'
        }

        # Initialize policy models
        self.policies = [
            PolicyModel(
                policy_name='Meal Expense Limit',
                category='Meals',
                max_amount=100.00,
                applicable_roles=['Staff', 'Manager'],
                description='Policy limits for meal expenses based on employee role.'
            ),
            PolicyModel(
                policy_name='Entertainment Expense Limit',
                category='Entertainment',
                max_amount=150.00,
                applicable_roles=['Manager'],
                description='Policy limits for entertainment expenses for managers.'
            )
        ]

        # Apply policy rules
        self.policy_rules = apply_policy_rules(self.policies)

        # Initialize tax rules (assuming apply_tax_rules returns a set of rules)
        self.tax_rules = apply_tax_rules()

    def test_policy_compliance(self):
        """
        Tests the policy compliance validation function to ensure it correctly identifies compliant and non-compliant expenses.

        Requirements Addressed:
        - Policy and Compliance Engine
          - Technical Specification/5.3 Feature ID: F-003
            - TR-F003.2: Perform real-time policy checks during expense submission.
            - TR-F003.5: Flag expenses that exceed policy limits or require additional approval.

        Steps:
        - Set up test cases with various expenses and expected compliance results.
        - Use the validate_policy_compliance function to check each test case.
        - Assert that the function's output matches the expected results.
        """
        # Test compliant expense
        is_compliant = validate_policy_compliance(self.expense_compliant, self.policy_rules)
        self.assertTrue(is_compliant, "Expected expense to be compliant with policy.")

        # Test non-compliant expense
        is_compliant = validate_policy_compliance(self.expense_non_compliant, self.policy_rules)
        self.assertFalse(is_compliant, "Expected expense to be non-compliant with policy.")

    def test_tax_compliance(self):
        """
        Tests the tax compliance validation function to ensure it correctly applies tax rules to expenses.

        Requirements Addressed:
        - Policy and Compliance Engine
          - Technical Specification/5.3 Feature ID: F-003
            - TR-F003.3: Integrate with global tax databases to ensure up-to-date tax compliance.
            - TR-F003.4: Automatically apply per diem rates based on travel location.

        Steps:
        - Set up test cases with various expenses and expected tax compliance results.
        - Use the apply_tax_rules function to check each test case.
        - Assert that the function's output matches the expected results.
        """
        # Test tax compliant expense
        tax_compliance_result = apply_tax_rules(self.expense_tax_compliant)
        self.assertTrue(tax_compliance_result['is_compliant'], "Expected expense to be tax compliant.")
        self.assertIn('tax_amount', tax_compliance_result, "Tax amount should be calculated.")

        # Test tax non-compliant expense
        tax_compliance_result = apply_tax_rules(self.expense_tax_non_compliant)
        self.assertFalse(tax_compliance_result['is_compliant'], "Expected expense to be tax non-compliant.")

    def test_validate_expense_route(self):
        """
        Tests the validate_expense_route function to ensure API requests for validating expenses are handled correctly.

        Requirements Addressed:
        - Policy and Compliance Engine
          - Technical Specification/5.3 Feature ID: F-003
            - TR-F003.2: Perform real-time policy checks during expense submission.
            - TR-F003.6: Generate alerts for non-compliant expenses.

        Steps:
        - Mock API requests with expense data.
        - Use validate_expense_route function to process each request.
        - Assert that the response status and data are as expected.
        """
        # Mock expense data for API request
        request_data_compliant = self.expense_compliant
        request_data_non_compliant = self.expense_non_compliant

        # Simulate API request for compliant expense
        response = validate_expense_route(request_data_compliant)
        self.assertEqual(response.status_code, 200, "Expected status code 200 for compliant expense.")
        self.assertTrue(response.json()['is_compliant'], "Expected expense to be compliant.")

        # Simulate API request for non-compliant expense
        response = validate_expense_route(request_data_non_compliant)
        self.assertEqual(response.status_code, 400, "Expected status code 400 for non-compliant expense.")
        self.assertFalse(response.json()['is_compliant'], "Expected expense to be non-compliant.")
        self.assertIn('message', response.json(), "Response should contain a message for non-compliance.")

if __name__ == '__main__':
    unittest.main()