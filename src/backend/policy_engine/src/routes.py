"""
This file defines the API routes for the policy engine component of the Global Employee Travel Expense Tracking App.
It handles requests for validating expenses against company policies and international tax regulations,
integrating with the policy and tax rule engines.

Requirements Addressed:
- Policy and Compliance Engine
    - Ensures that all submitted expenses adhere to configurable company policies and international tax laws by performing real-time policy checks and applying relevant regulations automatically.
    - Location: Technical Specification/5.3 Feature ID: F-003
"""

# External Dependencies
from flask import Flask, request, jsonify  # Flask==2.0.1
# To create and manage API routes.

# Internal Dependencies
from .models import PolicyModel  # To represent and manage policy data structures and validation logic.
from .utils import validate_policy_compliance  # To validate expenses against policy models.
from .rules.policy_rules import apply_policy_rules  # To apply policy rules to expenses.
from .rules.tax_rules import apply_tax_rules  # To apply tax rules to expenses.
from ..config import config  # To load configuration settings for database connections and rules paths.

# Initialize Flask application
app = Flask(__name__)

@app.route('/validate_expense', methods=['POST'])
def validate_expense_route():
    """
    Handles API requests for validating expenses against policy and tax rules.

    Parameters:
        request (Request): The incoming HTTP request containing expense data.

    Returns:
        Response: A JSON response indicating the compliance status of the expense.

    Steps:
        1. Parse the incoming request to extract expense data.
        2. Load the relevant policy and tax models using PolicyModel.
        3. Validate the expense against policy rules using validate_policy_compliance.
        4. Validate the expense against tax rules using apply_tax_rules.
        5. Return a JSON response with the compliance status and any violations.

    Requirements Addressed:
    - Policy and Compliance Engine
        - Ensures that all submitted expenses adhere to configurable company policies and international tax laws by performing real-time policy checks and applying relevant regulations automatically.
        - Location: Technical Specification/5.3 Feature ID: F-003
    """
    try:
        # Step 1: Parse the incoming request to extract expense data.
        expense_data = request.get_json()
        if not expense_data:
            return jsonify({'status': 'error', 'message': 'Invalid or missing JSON data'}), 400

        # Step 2: Load the relevant policy and tax models using PolicyModel.
        # Create an instance of PolicyModel to access policy data.
        policy_model = PolicyModel(config)

        # Retrieve applicable company policies based on expense data.
        policies = policy_model.get_applicable_policies(expense_data)
        # Retrieve applicable tax policies based on expense data.
        tax_policies = policy_model.get_applicable_tax_policies(expense_data)

        # Step 3: Validate the expense against policy rules using validate_policy_compliance.
        # Apply company policy rules to the expense data.
        policy_compliance_result = validate_policy_compliance(expense_data, policies)

        # Step 4: Validate the expense against tax rules using apply_tax_rules.
        # Apply tax rules to the expense data.
        tax_compliance_result = apply_tax_rules(expense_data, tax_policies)

        # Step 5: Return a JSON response with the compliance status and any violations.
        compliance_status = {
            'policy_compliance': policy_compliance_result,
            'tax_compliance': tax_compliance_result
        }

        return jsonify({'status': 'success', 'compliance': compliance_status}), 200

    except Exception as e:
        # Handle exceptions and return an error response.
        return jsonify({'status': 'error', 'message': str(e)}), 500