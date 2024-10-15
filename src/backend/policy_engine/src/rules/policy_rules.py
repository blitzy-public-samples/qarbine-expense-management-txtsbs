# src/backend/policy_engine/src/rules/policy_rules.py

"""
Module Description:
-------------------
This file defines the specific policy rules used within the policy engine component of the
Global Employee Travel Expense Tracking App. These rules are applied to ensure compliance
with company-specific expense policies and international regulations.

Requirements Addressed:
-----------------------
- Name: Policy and Compliance Engine
- Location: Technical Specification/5.3 Feature ID: F-003
- Description: Ensures that all submitted expenses adhere to configurable company policies
  and international tax laws by performing real-time policy checks and applying relevant
  regulations automatically.
"""

# Internal Dependencies
from ..models import PolicyModel  # To represent and manage policy data structures and validation logic.
from ..utils import validate_policy_compliance  # To validate expenses against policy models.
from .tax_rules import apply_tax_rules  # To apply tax rules to expenses.

def apply_policy_rules(policy: PolicyModel, expense) -> bool:
    """
    Applies a set of predefined policy rules to an expense to determine compliance with company-specific policies.

    Parameters:
    -----------
    policy : PolicyModel
        The policy model containing the company's expense policies.
    expense : Expense
        The expense to be evaluated against the policy rules.

    Returns:
    --------
    bool
        True if the expense complies with all policy rules, otherwise False.

    Steps:
    ------
    1. Retrieve the list of policy rules from the provided policy model.
    2. Iterate over each policy rule in the policy.
    3. Use the validate_policy_compliance function to check if the expense satisfies the current policy rule.
    4. Return False if any policy rule is violated.
    5. Return True if all policy rules are satisfied.

    Requirements Addressed:
    -----------------------
    - Name: Policy and Compliance Engine
    - Location: Technical Specification/5.3 Feature ID: F-003
    - Description: Ensures that all submitted expenses adhere to configurable company policies
      and international tax laws by performing real-time policy checks and applying relevant
      regulations automatically.
    """
    # Step 1: Retrieve the list of policy rules from the provided policy model.
    policy_rules = policy.get_policy_rules()

    # Apply tax rules to the expense before policy validation.
    # This ensures that tax regulations are considered in compliance checks.
    apply_tax_rules(expense)

    # Step 2: Iterate over each policy rule in the policy.
    for rule in policy_rules:
        # Step 3: Use the validate_policy_compliance function to check if the expense satisfies the current policy rule.
        is_compliant = validate_policy_compliance(expense, rule)

        # Debug Statement: Output the compliance status for each rule.
        # print(f"Checking compliance for rule '{rule.name}': {'Pass' if is_compliant else 'Fail'}")

        # Step 4: Return False if any policy rule is violated.
        if not is_compliant:
            # Log the violation for auditing purposes.
            # The logging mechanism should record the expense ID and the rule that was violated.
            # Example: log_violation(expense.id, rule.id)
            # For now, we will assume the logging function is implemented elsewhere.
            # log_violation(expense.id, rule.id)
            return False

    # Step 5: Return True if all policy rules are satisfied.
    return True