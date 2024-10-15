# Policy Engine Documentation

## Overview

The **Policy Engine** is a critical component of the **Global Employee Travel Expense Tracking App**, ensuring real-time compliance with company expense policies and international tax laws. It performs automatic validation of submitted expenses, applying relevant regulations to maintain adherence to organizational and legal standards.

*This addresses the requirements outlined in [Technical Specification/5.3 Feature ID: F-003](#) - **Policy and Compliance Engine**, ensuring that all submitted expenses adhere to configurable company policies and international tax laws.*

## Features

- **Real-Time Policy Checks**
  - Performs instant validation of expenses during submission.
  - *Requirement Addressed*: **TR-F003.2** - *Perform real-time policy checks during expense submission* (See [Technical Specification/5.3 Feature ID: F-003](#)).

- **Configurable Expense Policies**
  - Allows configuration based on employee level, department, and travel destination.
  - *Requirement Addressed*: **TR-F003.1** - *Allow configuration of expense policies based on employee level, department, and travel destination*.

- **International Tax Compliance**
  - Integrates with global tax databases for up-to-date regulations.
  - Automatically applies per diem rates based on travel location.
  - *Requirements Addressed*:
    - **TR-F003.3** - *Integrate with global tax databases to ensure up-to-date tax compliance*.
    - **TR-F003.4** - *Automatically apply per diem rates based on travel location*.

- **Expense Flagging and Alerts**
  - Flags expenses exceeding policy limits or requiring additional approval.
  - Generates alerts for non-compliant expenses.
  - *Requirements Addressed*:
    - **TR-F003.5** - *Flag expenses that exceed policy limits or require additional approval*.
    - **TR-F003.6** - *Generate alerts for non-compliant expenses*.

## Architecture

The Policy Engine is designed as a microservice within the application's backend, focusing solely on policy validation and compliance checks. It communicates with other services via API calls to ensure seamless integration and real-time processing.

### Internal Dependencies

- **`config.py`**
  - *Location*: `src/backend/policy_engine/config.py`
  - *Purpose*: Loads configuration settings for database connections and rules paths.
  - *Related Requirement*: Ensures dynamic policy configurations are loaded, addressing **TR-F003.1**.

- **`PolicyModel`**
  - *Location*: `src/backend/policy_engine/src/models.py`
  - *Purpose*: Represents and manages policy data structures and validation logic.
  - *Related Requirement*: Facilitates policy definitions per **TR-F003.1**.

- **`validate_policy_compliance`**
  - *Location*: `src/backend/policy_engine/src/utils.py`
  - *Purpose*: Validates expenses against policy models.
  - *Related Requirement*: Core function for **TR-F003.2**.

- **`apply_policy_rules`**
  - *Location*: `src/backend/policy_engine/src/rules/policy_rules.py`
  - *Purpose*: Applies policy rules to expenses.
  - *Related Requirement*: Implements **TR-F003.5** by flagging non-compliant expenses.

- **`apply_tax_rules`**
  - *Location*: `src/backend/policy_engine/src/rules/tax_rules.py`
  - *Purpose*: Applies tax rules to expenses.
  - *Related Requirement*: Addresses **TR-F003.3** and **TR-F003.4**.

- **`validate_expense_route`**
  - *Location*: `src/backend/policy_engine/src/routes.py`
  - *Purpose*: Handles API requests for validating expenses.
  - *Related Requirement*: Enables real-time validation per **TR-F003.2**.

### External Dependencies

- **Flask**
  - *Module*: `flask`
  - *Version*: `2.0.1`  <!-- Version specified as per Rule 3 -->
  - *Purpose*: Creates and manages API routes for the Policy Engine.
  - *Related Requirement*: Supports API endpoints for validation requests (**TR-F003.2**).

## Setup Instructions

### Prerequisites

- **Python 3.8+** installed on your system.
- **Virtual Environment** tool (`venv` or `virtualenv`).
- Access to the project's **GitHub repository**.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourorganization/expense-tracker.git
   ```

2. **Navigate to the Policy Engine Directory**

   ```bash
   cd expense-tracker/src/backend/policy_engine
   ```

3. **Create and Activate a Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

4. **Install Required Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

   > **Note**: Ensure that `Flask==2.0.1` is installed as specified in the dependencies.

### Configuration

- **Database Settings**

  Configure the database connection parameters in `config.py`.

  ```python
  DATABASE = {
      'host': 'your_database_host',
      'port': 'your_database_port',
      'user': 'your_database_user',
      'password': 'your_database_password',
      'db_name': 'policy_engine_db'
  }
  ```

- **Policy Rules Path**

  Set the path to the policy and tax rules files.

  ```python
  POLICY_RULES_PATH = '/path/to/policy_rules.json'
  TAX_RULES_PATH = '/path/to/tax_rules.json'
  ```

## Usage Guidelines

### Running the Policy Engine

Start the Flask application to handle API requests.

```bash
python app.py
```

*This runs the `validate_expense_route` to process validation requests, addressing **TR-F003.2**.*

### API Endpoint

#### `/validate_expense`

- **Method**: `POST`
- **Description**: Validates an expense report against company policies and tax regulations.
- **Request Format**:

  ```json
  {
    "employee_id": "12345",
    "expense_items": [
      {
        "category": "Meals",
        "amount": 50.00,
        "currency": "USD",
        "expense_date": "2023-10-01",
        "description": "Team lunch",
        "location": "New York, USA"
      }
    ]
  }
  ```

- **Response**:

  - **On Success**:

    ```json
    {
      "status": "approved",
      "message": "Expense report is compliant with all policies."
    }
    ```

  - **On Failure**:

    ```json
    {
      "status": "rejected",
      "message": "Expense exceeds allowed limit for Meals.",
      "violations": [
        {
          "rule": "MaxAmount",
          "limit": 30.00,
          "category": "Meals"
        }
      ]
    }
    ```

*The API facilitates real-time validation and generates alerts for non-compliance, fulfilling **TR-F003.2** and **TR-F003.6**.*

## Testing

### Running Tests

Tests are located in `tests/test_policy_engine.py`. Run the tests using:

```bash
python -m unittest discover tests
```

*These tests verify compliance with requirements such as **TR-F003.2**, **TR-F003.3**, and **TR-F003.5**.*

### Test Coverage

- **Policy Validation Tests**
  - Validate correct application of policy rules.
- **Tax Compliance Tests**
  - Ensure that tax rules are applied based on location.
- **Edge Case Tests**
  - Test scenarios where expenses are exactly at policy limits.

## Configuration Details

### Policy Configuration

Policies are defined in JSON files, allowing administrators to update rules without altering code.

**Example `policy_rules.json`:**

```json
{
  "policy_rules": [
    {
      "category": "Meals",
      "max_amount": 30.00,
      "applicable_roles": ["Employee", "Manager"],
      "locations": ["USA", "Canada"]
    }
  ]
}
```

*This structure supports **TR-F003.1** by allowing configurations based on various parameters.*

### Tax Rules Configuration

Tax rules are similarly defined and can be updated as regulations change.

**Example `tax_rules.json`:**

```json
{
  "tax_rules": [
    {
      "country": "USA",
      "state": "New York",
      "tax_rate": 0.08875
    }
  ]
}
```

*This ensures compliance with **TR-F003.3** and **TR-F003.4**.*

## Contributing

Developers contributing to the Policy Engine should:

- **Adhere to Coding Standards**: Follow the project's coding conventions.
- **Write Unit Tests**: Include tests for new features or bug fixes.
- **Update Documentation**: Reflect any changes in this README and related documents.

*Contributions should aim to enhance compliance and functionality as per **Technical Specification/5.3 Feature ID: F-003**.*

## External Dependencies

Ensure that all external packages are up to date and compatible.

- **Flask** (`version 2.0.1`)
  - Used for creating API endpoints.
  - Install specific version to maintain compatibility.

  ```bash
  pip install Flask==2.0.1
  ```

  <!-- Version specified as per Rule 3 -->

## Contact Information

For issues, questions, or contributions:

- **Email**: policy-engine-dev@company.com
- **Slack**: `#policy-engine-team`

*Maintaining open communication ensures alignment with project requirements and facilitates efficient collaboration.*