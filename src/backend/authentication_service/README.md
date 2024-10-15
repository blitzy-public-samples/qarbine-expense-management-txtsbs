# Authentication Service Documentation

## Introduction

The Authentication Service is a critical component of the Global Employee Travel Expense Tracking App, responsible for handling user authentication, authorization, and security. It ensures that only authorized users can access the application's resources and provides role-based access control (RBAC) to enforce permissions.

**Requirements Addressed:**

- **Secure User Authentication and Role-Based Authorization**
  - **Location:** Technical Specification - 5.1 Feature ID: F-001
  - **Description:** Implement secure login, multi-factor authentication, and role-based access levels.

## Dependencies

### Internal Dependencies

- **`config.py`**
  - **`DATABASE_URL`**
    - Module: `src/backend/authentication_service/config.py`
    - Purpose: Database connection string for ORM setup.
  - **`SECRET_KEY`**
    - Module: `src/backend/authentication_service/config.py`
    - Purpose: Secret key for session management and token encoding.
  - **`DEBUG`**
    - Module: `src/backend/authentication_service/config.py`
    - Purpose: Debug mode configuration for the application.

- **Models (`src/models.py`):**
  - **`User`**
    - Purpose: User model for handling user-related operations.
  - **`Role`**
    - Purpose: Role model for managing user roles and permissions.

- **Utilities (`src/utils.py`):**
  - **`hash_password`**
    - Purpose: Utility function for hashing passwords.
  - **`verify_password`**
    - Purpose: Utility function for verifying passwords.
  - **`generate_token`**
    - Purpose: Utility function for generating JWT tokens.
  - **`validate_token`**
    - Purpose: Utility function for validating JWT tokens.

- **API Routes (`src/routes.py`):**
  - **`register_user`**
    - Purpose: API endpoint for user registration.
  - **`login_user`**
    - Purpose: API endpoint for user login.
  - **`protected_route`**
    - Purpose: Example of a protected API route.

### External Dependencies

- **Flask** (`flask`) - *Version: 2.0.1*
  - Purpose: Web framework for handling HTTP requests and routing.

- **Flask-JWT-Extended** (`flask_jwt_extended`) - *Version: 4.3.1*
  - Purpose: Extension for handling JWT token creation and validation.

- **SQLAlchemy** (`sqlalchemy`) - *Version: 1.4.25*
  - Purpose: ORM for defining database models and handling database operations.

- **bcrypt** (`bcrypt`) - *Version: 3.2.0*
  - Purpose: Password hashing for secure storage of user passwords.

- **PyJWT** (`PyJWT`) - *Version: 2.3.0*
  - Purpose: Token generation and validation for authentication.

- **pytest** (`pytest`) - *Version: 6.2.4*
  - Purpose: Testing framework for writing and executing test cases.

- **Flask-Testing** (`flask_testing`) - *Version: 0.8.1*
  - Purpose: Extension for testing Flask applications.

## Setup Instructions

To set up the Authentication Service, follow these steps:

1. **Install Dependencies**

   Ensure all dependencies listed in `requirements.txt` are installed:

   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment Variables**

   Set up the following environment variables in `config.py` or through your environment:

   - `DATABASE_URL`: Database connection string for ORM setup.
   - `SECRET_KEY`: Secret key for session management and token encoding.
   - `DEBUG`: Debug mode configuration (`True` for development, `False` for production).

   Example `.env` file:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/expense_db
   SECRET_KEY=your_secret_key
   DEBUG=True
   ```

3. **Database Migration**

   Initialize and migrate the database schema:

   ```bash
   flask db init
   flask db migrate -m "Initial migration."
   flask db upgrade
   ```

4. **Run the Application**

   Start the Flask application:

   ```bash
   flask run
   ```

5. **Docker Deployment (Optional)**

   Build and run the Docker container:

   ```bash
   docker build -t authentication_service .
   docker run -d -p 5000:5000 --env-file .env authentication_service
   ```

## Usage Instructions

The Authentication Service provides the following API endpoints:

- **Register User**

  - **Endpoint:** `/register`
  - **Method:** `POST`
  - **Description:** Registers a new user.

  **Request Example:**

  ```json
  {
    "username": "john_doe",
    "password": "secure_password"
  }
  ```

- **Login User**

  - **Endpoint:** `/login`
  - **Method:** `POST`
  - **Description:** Authenticates a user and returns a JWT token.

  **Request Example:**

  ```json
  {
    "username": "john_doe",
    "password": "secure_password"
  }
  ```

- **Protected Route Example**

  - **Endpoint:** `/protected`
  - **Method:** `GET`
  - **Description:** An example of a protected route that requires a valid JWT token.

  **Request Header:**

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

## Testing Instructions

To test the Authentication Service, execute the unit tests using `pytest`:

1. **Set Up Test Environment**

   Ensure the test environment is configured with a test database and necessary environment variables.

2. **Run Tests**

   ```bash
   pytest tests/test_authentication.py
   ```

3. **Review Test Results**

   Verify that all tests pass to ensure the authentication functionality is working as expected.

## Implementation Details

### Models

- **User Model (`User`):**

  Defined in `src/models.py`, it represents the user entity with fields for username, password hash, and role assignments.

- **Role Model (`Role`):**

  Manages user roles and permissions, supporting role-based access control as per **Feature ID: F-001**.

### Utilities

Located in `src/utils.py`, these functions support authentication operations:

- **`hash_password(password)`**: Hashes passwords using bcrypt.
- **`verify_password(password, hashed_password)`**: Verifies passwords against stored hashes.
- **`generate_token(identity)`**: Generates JWT tokens for authenticated users.
- **`validate_token(token)`**: Validates JWT tokens to allow access to protected resources.

### API Routes

Defined in `src/routes.py`:

- **`register_user`**: Handles user registration.
- **`login_user`**: Authenticates users and issues JWT tokens.
- **`protected_route`**: Demonstrates access to a route protected by JWT authentication.

## Requirement Mapping

This service fulfills the following technical requirements from the specification:

- **TR-F001.1**: Implement secure login using unique username and password.
- **TR-F001.2**: (Planned) Implement multi-factor authentication (MFA).
- **TR-F001.3**: Enable Single Sign-On (SSO) integration with company identity providers.
- **TR-F001.4**: Define role-based access levels for different user roles.
- **TR-F001.5**: (Planned) Provide password recovery and reset functionality.

Refer to **Technical Specification - 5.1 Feature ID: F-001** for detailed requirements.

## Additional Notes

- **Security Practices:**
  - Passwords are securely hashed using bcrypt.
  - JWT tokens are used for stateless authentication and include user role information.
  - Environment variables are used to manage sensitive configuration data.

- **Future Enhancements:**
  - Implementation of MFA as per requirement **TR-F001.2**.
  - Addition of password recovery functionality (**TR-F001.5**).
  - Integration with external identity providers for SSO.

- **Integration Points:**
  - This service is designed to integrate seamlessly with other backend services and the API Gateway.
  - Provides authentication mechanisms for the entire application as outlined in the system architecture.

## Contact Information

For questions or further assistance, please contact the development team at [devteam@example.com](mailto:devteam@example.com).