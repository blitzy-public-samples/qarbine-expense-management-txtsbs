"""
Utility functions for the policy engine component of the Global Employee Travel Expense Tracking App.
These functions support policy and tax compliance checks by providing common operations and validations used across the policy engine.

Requirements Addressed:
- Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003)
  Ensures that all submitted expenses adhere to configurable company policies and international tax laws by performing real-time policy checks and applying relevant regulations automatically.
"""

from models import PolicyModel  # Internal dependency: represents and manages policy data structures and validation logic.
from rules.policy_rules import apply_policy_rules  # Internal dependency: applies policy rules to expenses.
from rules.tax_rules import apply_tax_rules  # Internal dependency: applies tax rules to expenses.
# Note: The Expense model should be imported from its defined module.
from expense_model import Expense  # Internal dependency: represents the expense data structure.

import logging

# Configure logging for the utility module.
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def validate_policy_compliance(policy: PolicyModel, expense: Expense) -> bool:
    """
    Validates an expense against a given policy model to ensure compliance with all applicable rules.

    Parameters:
    - policy (PolicyModel): The policy model containing the policy rules.
    - expense (Expense): The expense to be validated.

    Returns:
    - bool: True if the expense complies with all policy rules, otherwise False.

    Steps:
    1. Retrieve the list of rules from the provided policy model.
    2. Iterate over each rule in the policy.
    3. Check if the expense satisfies the current rule using apply_policy_rules.
    4. Return False if any rule is violated.
    5. Return True if all rules are satisfied.

    Requirements Addressed:
    - Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003)
    """

    try:
        # Step 1: Retrieve the list of rules from the provided policy model.
        policy_rules = policy.get_policy_rules()
        logger.debug(f"Retrieved {len(policy_rules)} policy rules from the policy model.")

        # Step 2: Iterate over each rule in the policy.
        for rule in policy_rules:
            # Step 3: Check if the expense satisfies the current rule using apply_policy_rules.
            if not apply_policy_rules(rule, expense):
                # Log the rule violation for auditing purposes.
                logger.warning(
                    f"Expense ID {expense.id} violates policy rule ID {rule.id}: {rule.description}"
                )
                # Step 4: Return False if any rule is violated.
                return False

        # Step 5: Return True if all rules are satisfied.
        logger.info(f"Expense ID {expense.id} complies with all policy rules.")
        return True

    except Exception as e:
        logger.error(
            f"An error occurred during policy compliance validation for Expense ID {expense.id}: {str(e)}"
        )
        # Re-raise the exception to be handled by the caller as per error handling policies.
        raise


def validate_tax_compliance(policy: PolicyModel, expense: Expense) -> bool:
    """
    Validates an expense against a given policy model to ensure compliance with all applicable tax rules.

    Parameters:
    - policy (PolicyModel): The policy model containing the tax rules.
    - expense (Expense): The expense to be validated.

    Returns:
    - bool: True if the expense complies with all tax rules, otherwise False.

    Steps:
    1. Retrieve the list of tax rules from the provided policy model.
    2. Iterate over each tax rule in the policy.
    3. Check if the expense satisfies the current tax rule using apply_tax_rules.
    4. Return False if any tax rule is violated.
    5. Return True if all tax rules are satisfied.

    Requirements Addressed:
    - Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003)
    """

    try:
        # Step 1: Retrieve the list of tax rules from the provided policy model.
        tax_rules = policy.get_tax_rules()
        logger.debug(f"Retrieved {len(tax_rules)} tax rules from the policy model.")

        # Step 2: Iterate over each tax rule in the policy.
        for tax_rule in tax_rules:
            # Step 3: Check if the expense satisfies the current tax rule using apply_tax_rules.
            if not apply_tax_rules(tax_rule, expense):
                # Log the tax rule violation for auditing purposes.
                logger.warning(
                    f"Expense ID {expense.id} violates tax rule ID {tax_rule.id}: {tax_rule.description}"
                )
                # Step 4: Return False if any tax rule is violated.
                return False

        # Step 5: Return True if all tax rules are satisfied.
        logger.info(f"Expense ID {expense.id} complies with all tax rules.")
        return True

    except Exception as e:
        logger.error(
            f"An error occurred during tax compliance validation for Expense ID {expense.id}: {str(e)}"
        )
        # Re-raise the exception to be handled by the caller as per error handling policies.
        raise