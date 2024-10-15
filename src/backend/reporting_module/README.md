# Reporting Module

## Overview

The Reporting Module is a component of the Global Employee Travel Expense Tracking App that provides comprehensive reporting tools and customizable dashboards. It offers real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles such as employees, managers, finance teams, and administrators.

This module addresses the following requirement:

- **Feature:** Reporting and Analytics
- **Requirement Location:** Technical Specification/5.6 Feature ID: F-006
- **Description:** "Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles."

## Setup Instructions

To set up the Reporting Module, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourcompany/expense-tracker.git
   ```

2. **Navigate to the reporting_module directory:**

   ```bash
   cd expense-tracker/src/backend/reporting_module
   ```

3. **Create and activate a virtual environment (optional but recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install the dependencies:**

   Install the required packages listed in `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

   The external dependencies include:

   - **Flask** (version 2.0.1) – To create and manage API routes for the reporting module.
     ```python
     # Flask version 2.0.1
     from flask import Flask
     ```
   - **unittest** – To provide a framework for writing and running tests.
     ```python
     # unittest is part of the Python Standard Library
     import unittest
     ```

## Configuration

The module uses a configuration file `config.py` to set up logging and other configurations.

- **`setup_logging`** function (located in `config.py`):
  - Purpose: Configures logging for the reporting module.
  - Usage:
    ```python
    from config import setup_logging

    setup_logging()
    ```
  - **Requirement Addressed:** Ensures proper logging as part of system monitoring (see Technical Specification/6.3.2 Backend).

## Data Models

The data models are defined in `src/models.py`.

- **`ExpenseReportModel`** class:
  - Purpose: Defines the data structure for expense reports used in data processing and API responses.
  - Attributes:
    - `report_id`
    - `employee_id`
    - `submission_date`
    - `total_amount`
    - `currency`
    - `items` (list of expense items)
  - **Requirement Addressed:** Supports detailed expense reports by employee (TR-F006.2 in Technical Specification/5.6 Feature ID: F-006).

## Utility Functions

Utility functions are located in `src/utils.py`.

- **`process_expense_data`** function:
  - Purpose: Processes raw expense data for reporting.
  - Usage:
    ```python
    from utils import process_expense_data

    processed_data = process_expense_data(raw_data)
    ```
  - **Requirement Addressed:** Prepares data for generating reports and analytics (TR-F006.3).

- **`generate_summary_statistics`** function:
  - Purpose: Generates summary statistics for analytics.
  - Usage:
    ```python
    from utils import generate_summary_statistics

    stats = generate_summary_statistics(processed_data)
    ```
  - **Requirement Addressed:** Calculates key metrics for dashboards (TR-F006.1).

## API Endpoints

The API endpoints are defined in `src/routes.py`.

### 1. Get Expense Report

- **Endpoint:** `/expense_report/<report_id>`
- **Method:** `GET`
- **Purpose:** Retrieves a specific expense report.
- **Usage Example:**
  ```bash
  curl -X GET http://localhost:5000/expense_report/12345
  ```
- **Requirement Addressed:** Provides detailed expense reports (TR-F006.2).

### 2. Create Expense Report

- **Endpoint:** `/expense_report`
- **Method:** `POST`
- **Purpose:** Creates a new expense report.
- **Usage Example:**
  ```bash
  curl -X POST http://localhost:5000/expense_report \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "E001",
    "items": [
      {
        "date": "2023-10-01",
        "category": "Travel",
        "amount": 500.00,
        "description": "Flight to New York"
      },
      {
        "date": "2023-10-02",
        "category": "Lodging",
        "amount": 1000.00,
        "description": "Hotel stay"
      }
    ]
  }'
  ```
- **Requirement Addressed:** Enables creation of new expense reports for real-time data (TR-F006.2).

### 3. Get Summary Statistics

- **Endpoint:** `/summary_statistics`
- **Method:** `GET`
- **Purpose:** Retrieves summary statistics for analytics.
- **Usage Example:**
  ```bash
  curl -X GET http://localhost:5000/summary_statistics
  ```
- **Requirement Addressed:** Provides analytics data for dashboards (TR-F006.1, TR-F006.3).

## Running the Application

To run the reporting module, execute the following command:

```bash
python app.py
```

The application will start and listen on the default port `5000`.

## Testing

Tests are located in the `tests` directory. To run the tests, use the following command:

```bash
python -m unittest discover tests
```

- **unittest** framework is used for testing.
- **Requirement Addressed:** Ensures the reliability of the reporting module (see Technical Specification/5.15 Feature ID: F-015).

## Requirements Addressed

This module fulfills the requirements detailed in the Technical Specification:

- **Feature ID:** F-006 Reporting and Analytics (Section 5.6)
- **Technical Requirements:**
  - **TR-F006.1:** Offer customizable dashboards tailored to different user roles.
  - **TR-F006.2:** Generate detailed expense reports by employee, department, project, or cost center.
  - **TR-F006.3:** Perform trend analysis on travel spending.
  - **TR-F006.4:** Enable export of reports in multiple formats (e.g., PDF, Excel, CSV).
  - **TR-F006.6:** Integrate with business intelligence tools for advanced analytics.

## Integration Points

- **Authentication Service (`app.py`):**
  - Integrates with the authentication service to secure API endpoints.
  - **Purpose:** Ensures that only authorized users can access reporting data.

- **Database Access:**
  - Retrieves and stores data in the PostgreSQL database.
  - **Configuration:** Database settings are defined in `config.py`.

## Additional Notes

- **Future Enhancements:**
  - Implementing anomaly detection features as per Technical Specification/5.26 Feature ID: F-026.
  - Adding support for exporting reports in multiple formats (TR-F006.4).

- **Code Organization:**
  - **`app.py`**: Entry point of the reporting module application.
  - **`config.py`**: Contains configuration settings and the `setup_logging` function.
  - **`src/models.py`**: Defines data models such as `ExpenseReportModel`.
  - **`src/utils.py`**: Provides utility functions like `process_expense_data` and `generate_summary_statistics`.
  - **`src/routes.py`**: Defines API endpoints for the reporting module.
  - **`tests/`**: Contains unit tests for the module using the `unittest` framework.

- **Logging:**
  - Logging is configured in `config.py` using the `setup_logging` function.
  - **Purpose:** Facilitates debugging and monitoring of the reporting module.

## Contact Information

For support or inquiries, please contact the development team at [support@company.com].