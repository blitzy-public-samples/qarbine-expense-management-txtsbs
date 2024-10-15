# Notification Service

The Notification Service is responsible for keeping users informed about important events, updates, and required actions within the application through various communication channels.

## Requirements Addressed

This service addresses the **Notification and Alerting System** as specified in the Technical Specification.

- **Feature ID: F-017** - *Notification and Alerting System*
  - **Description:** Develops a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.
  - **Technical Requirements Addressed:**
    - **TR-F017.1:** Send email and in-app notifications for pending expense approvals.
    - **Location:** Technical Specification - 5.17 Feature ID: F-017
    - **TR-F017.3:** Alert managers of newly submitted expenses awaiting approval.
    - **Location:** Technical Specification - 5.17 Feature ID: F-017

By implementing these requirements, the Notification Service ensures timely communication within the application, enhancing user engagement and operational efficiency.

## Setup Instructions

To set up the Notification Service, follow these steps:

1. **Install Dependencies**

   Ensure all dependencies listed in `requirements.txt` are installed:

   ```bash
   pip install -r requirements.txt
   ```

   **External Dependencies:**

   - **Flask** (`flask`, version 2.0.1): Web framework for handling HTTP requests.
   - **Flask-RESTful** (`flask-restful`, version 0.3.9): Provides RESTful API support.
   - **Flask-SQLAlchemy** (`flask-sqlalchemy`, version 2.5.1): ORM integration with Flask.
   - **Flask-Migrate** (`flask-migrate`, version 3.1.0): Handles database migrations.
   - **PyJWT** (`pyjwt`, version 2.1.0): Manages JSON Web Tokens for authentication.
   - **requests** (`requests`, version 2.26.0): Makes HTTP requests to external services.

2. **Configure Environment Variables**

   Set up environment variables for logging and database connections as specified in `config.py`. This includes configuring:

   - **Database URI:** Connection string for the database.
   - **Logging Level:** Define the verbosity of logs.

   Import the `setup_logging` function from `config.py` to initialize logging:

   ```python
   from config import setup_logging
   setup_logging()
   ```

3. **Database Migrations**

   Use Flask-Migrate to apply database migrations:

   ```bash
   flask db upgrade
   ```

   This ensures the database schema is up to date with the models defined in `src/models.py`.

## Usage Guidelines

The Notification Service provides endpoints for sending notifications and querying their statuses.

- **API Endpoints:**

  - `POST /notifications`: Send a new notification.
    - **Handler Function:** `send_notification` in `src/routes.py`
    - **Purpose:** Handles the creation and delivery of notifications.
  - `GET /notifications/<id>`: Retrieve the status of a notification.
    - **Purpose:** Allows querying the delivery status of a specific notification.

- **Internal Modules:**

  - **`format_message`** (`src/utils.py`): Formats messages before sending.
  - **`get_delivery_method`** (`src/utils.py`): Determines the delivery channel (email, in-app).
  - **`generate_timestamp`** (`src/utils.py`): Generates timestamps for notifications.

- **Logging:**

  Ensure logging is configured to monitor service operations. Logs are crucial for:

  - Tracking notification delivery.
  - Debugging issues.
  - Auditing purposes.

## Dependencies

### Internal Dependencies

- **`setup_logging`** (`config.py`):
  - **Purpose:** Configures logging for the service.
  - **Usage:** Initializes logging settings based on environment variables.

- **`Notification` Model (`src/models.py`)**:
  - **Purpose:** Represents notification entities in the database.
  - **Attributes:**
    - Recipient information.
    - Message content.
    - Status of delivery.

- **Utility Functions (`src/utils.py`)**:
  - **`format_message`**: Prepares message content.
  - **`get_delivery_method`**: Selects the appropriate channel.
  - **`generate_timestamp`**: Creates timestamps for events.

- **Route Handlers (`src/routes.py`)**:
  - **`send_notification`**:
    - **Purpose:** API endpoint to send notifications.
    - **Process:**
      1. Receives request data.
      2. Validates input.
      3. Creates a `Notification` instance.
      4. Initiates delivery process.

### External Dependencies

- **Flask** (`flask`, version 2.0.1):
  - Web framework for building the service.
- **Flask-RESTful** (`flask-restful`, version 0.3.9):
  - Adds support for quickly building REST APIs.
- **Flask-SQLAlchemy** (`flask-sqlalchemy`, version 2.5.1):
  - Integrates SQLAlchemy ORM with Flask.
- **Flask-Migrate** (`flask-migrate`, version 3.1.0):
  - Handles database migrations using Alembic.
- **PyJWT** (`pyjwt`, version 2.1.0):
  - Enables JWT encoding and decoding for authentication.
- **requests** (`requests`, version 2.26.0):
  - Allows making HTTP requests to external services.

## Additional Notes

- **Security Considerations:**
  - Authentication is handled using JWTs via `PyJWT`.
  - Ensure all API endpoints validate tokens before proceeding.

- **Related Features:**
  - Supports both email and in-app notifications, aligning with **TR-F017.1** and **TR-F017.3** requirements.

- **Logging Configuration:**
  - Adjust logging level in `config.py` based on the deployment environment (e.g., DEBUG, INFO, ERROR).

- **Extensibility:**
  - The service is designed to support additional notification channels in the future (e.g., SMS, push notifications).

## Contact Information

For questions or assistance, please contact the development team or refer to the project's main documentation.

---

*This service is a critical component of the Global Employee Travel Expense Tracking App, ensuring effective communication across the application.*