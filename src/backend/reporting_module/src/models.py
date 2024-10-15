"""
Module: models.py

Defines the data models used in the reporting module, particularly focusing on the structure and attributes of expense reports and related entities. These models are crucial for data processing, storage, and retrieval operations within the reporting module.

Requirements Addressed:
- Reporting and Analytics (Feature ID: F-006)
  Location: Technical Specification/5.6 Feature ID: F-006
  Description: Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles.
"""

class ExpenseReportModel:
    """
    Represents the structure of an expense report, including fields for report ID, employee details, submission date, status, and total amount.

    Requirements Addressed:
    - Reporting and Analytics (Feature ID: F-006)
      Location: Technical Specification/5.6 Feature ID: F-006
      Description: Provides a data model to support comprehensive reporting tools and real-time visibility into travel expenses, aiding in budgeting, forecasting, and financial analysis.

    Attributes:
        report_id (int): The unique identifier for the expense report.
        employee_id (str): The identifier of the employee who submitted the report.
        submission_date (str): The date the report was submitted.
        status (str): The current status of the expense report.
        total_amount (float): The total amount of all expenses in the report.
    """

    def __init__(self, report_id, employee_id, submission_date, status, total_amount):
        """
        Initializes an instance of ExpenseReportModel with the given parameters.

        Parameters:
            report_id (int): The unique identifier for the expense report.
            employee_id (str): The identifier of the employee who submitted the report.
            submission_date (str): The date the report was submitted.
            status (str): The current status of the expense report.
            total_amount (float): The total amount of all expenses in the report.

        Steps:
            1. Assign report_id to the instance.
            2. Assign employee_id to the instance.
            3. Assign submission_date to the instance.
            4. Assign status to the instance.
            5. Assign total_amount to the instance.
        """
        self.report_id = report_id
        self.employee_id = employee_id
        self.submission_date = submission_date
        self.status = status
        self.total_amount = total_amount

    def to_dict(self):
        """
        Converts the expense report model instance into a dictionary format.

        Returns:
            dict: A dictionary representation of the expense report model.

        Steps:
            1. Create a dictionary with keys corresponding to model properties.
            2. Populate the dictionary with values from the instance properties.
            3. Return the dictionary.

        Requirements Addressed:
        - Reporting and Analytics (Feature ID: F-006)
          Location: Technical Specification/5.6 Feature ID: F-006
          Description: Facilitates data serialization for reporting tools and APIs, supporting real-time visibility and analytics.
        """
        data = {
            'report_id': self.report_id,
            'employee_id': self.employee_id,
            'submission_date': self.submission_date,
            'status': self.status,
            'total_amount': self.total_amount,
        }
        return data