# Internal dependencies for policy compliance validation
from .utils import validate_policy_compliance
from .rules.policy_rules import apply_policy_rules
from .rules.tax_rules import apply_tax_rules

class PolicyModel:
    """
    Represents the structure and logic for policy data, including rules and validation methods.
    
    Addresses requirements from:
    - Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003):
      Ensures that all submitted expenses adhere to configurable company policies and international tax laws
      by performing real-time policy checks and applying relevant regulations automatically.
    """

    def __init__(self, policy_name: str, rules: list):
        """
        Initializes a PolicyModel instance with a name and a set of rules.

        Parameters:
            policy_name (str): The name of the policy.
            rules (list): A list of rules associated with the policy.

        Steps:
            - Assign the policy_name to the instance.
            - Assign the rules to the instance.
        """
        # Assign the policy_name to the instance
        self.policy_name = policy_name  # The name of the policy.
        # Assign the rules to the instance
        self.rules = rules  # A list of policy rules.

    def validate_expense(self, expense) -> bool:
        """
        Validates an expense against the policy rules.

        Parameters:
            expense (Expense): The expense to validate.

        Returns:
            bool: True if the expense complies with all policy rules, otherwise False.

        Steps:
            - Iterate over each rule in the policy.
            - Check if the expense satisfies the current rule using apply_policy_rules.
            - Return False if any rule is violated.
            - Return True if all rules are satisfied.

        Addresses requirements from:
        - Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003):
          Ensures that all submitted expenses adhere to configurable company policies and international tax laws
          by performing real-time policy checks and applying relevant regulations automatically.
        """
        # Iterate over each rule in the policy
        for rule in self.rules:
            # Apply the current policy rule to the expense
            if not apply_policy_rules(expense, rule):
                # Expense violates the current policy rule
                return False  # Return False if any rule is violated
        # Apply tax rules to the expense
        if not apply_tax_rules(expense):
            # Expense violates tax compliance rules
            return False  # Return False if tax rules are violated
        # Expense satisfies all policy and tax rules
        return True  # Return True if all rules are satisfied