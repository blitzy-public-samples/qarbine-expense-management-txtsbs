"""
utils.py

Utility functions for the reporting module, providing data processing and analytical capabilities to support report generation and analytics.

Requirements Addressed:
- Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006):
  Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles.

Dependencies:
- Internal:
  - ExpenseReportModel from models.py:
    To define the data structure for expense reports used in data processing.
"""

import logging
from typing import List, Dict, Any
from datetime import datetime

# Configure module-level logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)  # Set logging level to INFO

# Import internal dependencies
from .models import ExpenseReportModel  # Internal dependency for expense report data structures

def process_expense_data(raw_data: List[ExpenseReportModel]) -> List[Dict[str, Any]]:
    """
    Processes raw expense data to prepare it for reporting and analytics.

    Parameters:
    - raw_data (List[ExpenseReportModel]): List of raw expense data instances to be processed.

    Returns:
    - List[Dict[str, Any]]: Processed data ready for reporting.

    Steps:
    1. Validate the structure and content of raw_data.
    2. Transform raw_data into a structured format suitable for reporting.
    3. Return the processed data.

    Requirements Addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006):
      Enables data processing necessary for generating comprehensive reports and dashboards.

    """

    logger.info("Starting expense data processing for %d records.", len(raw_data))
    processed_data = []

    for expense in raw_data:
        try:
            # Step 1: Validate the structure and content of raw_data.
            if not isinstance(expense, ExpenseReportModel):
                logger.error("Invalid data type for expense record: %s", type(expense))
                continue

            if expense.amount is None or expense.date is None:
                logger.warning("Missing essential fields in expense ID %s.", expense.id)
                continue

            # Step 2: Transform raw_data into a structured format suitable for reporting.
            processed_record = {
                'expense_id': expense.id,
                'employee_id': expense.employee_id,
                'amount': float(expense.amount),
                'currency': expense.currency,
                'date': expense.date.isoformat() if isinstance(expense.date, datetime) else str(expense.date),
                'category': expense.category,
                'department': expense.department,
                'project': expense.project,
                'cost_center': expense.cost_center,
                'description': expense.description,
                'status': expense.status
            }

            # Additional fields can be added as needed for reporting purposes.

            processed_data.append(processed_record)
            logger.debug("Processed expense ID %s successfully.", expense.id)

        except Exception as e:
            logger.exception("Exception occurred while processing expense ID %s: %s", expense.id, str(e))
            continue  # Proceed to process the next expense record

    logger.info("Completed processing of expense data. Total valid records: %d.", len(processed_data))
    return processed_data


def generate_summary_statistics(processed_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Generates summary statistics from processed expense data.

    Parameters:
    - processed_data (List[Dict[str, Any]]): List of processed expense data dictionaries.

    Returns:
    - Dict[str, Any]: Summary statistics including totals, averages, and other metrics.

    Steps:
    1. Aggregate data to compute total expenses.
    2. Calculate averages and other relevant metrics.
    3. Compile the statistics into a dictionary format.
    4. Return the summary statistics.

    Requirements Addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006):
      Provides analytical insights necessary for budgeting, forecasting, and financial analysis.

    """

    logger.info("Starting generation of summary statistics for %d records.", len(processed_data))

    if not processed_data:
        logger.warning("Processed data is empty. Returning default statistics.")
        return {
            'total_expenses': 0.0,
            'average_expense': 0.0,
            'maximum_expense': 0.0,
            'minimum_expense': 0.0,
            'expense_count': 0
        }

    total_expenses = 0.0
    maximum_expense = float('-inf')
    minimum_expense = float('inf')
    expense_count = len(processed_data)
    currency_set = set()

    for record in processed_data:
        amount = record.get('amount', 0.0)
        currency = record.get('currency', 'USD')
        currency_set.add(currency)

        total_expenses += amount
        maximum_expense = max(maximum_expense, amount)
        minimum_expense = min(minimum_expense, amount)

        logger.debug("Processing amount: %f, Currency: %s", amount, currency)

    average_expense = total_expenses / expense_count if expense_count > 0 else 0.0

    summary_statistics = {
        'total_expenses': total_expenses,
        'average_expense': average_expense,
        'maximum_expense': maximum_expense,
        'minimum_expense': minimum_expense,
        'expense_count': expense_count,
        'currencies': list(currency_set)
    }

    logger.info("Generated summary statistics: Total Expenses=%f, Average Expense=%f, Maximum Expense=%f, Minimum Expense=%f, Expense Count=%d",
                total_expenses, average_expense, maximum_expense, minimum_expense, expense_count)

    # Step 4: Return the summary statistics.
    return summary_statistics
```