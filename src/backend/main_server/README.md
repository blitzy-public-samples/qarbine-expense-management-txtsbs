# Main Server Component - Global Employee Travel Expense Tracking App

**Version:** 1.0.0

## Overview

The Main Server Component is the core backend service of the Global Employee Travel Expense Tracking App. It serves as the central point of communication between the mobile and web clients, handling all HTTP requests, processing business logic, and integrating with other backend services such as authentication, policy engine, notification service, and database.

This documentation aims to provide comprehensive setup instructions, configuration details, and usage guidelines for developers and administrators, supporting the requirements outlined in:

- **Requirement**: Provide comprehensive training materials and support resources.
- **Technical Specification Location**: [Technical Specification/5.24 Feature ID: F-024 User Training and Support](#)

[Feature ID: F-024 User Training and Support](#) focuses on facilitating user adoption by ensuring that developers and administrators can effectively utilize and manage the system’s features and functionalities.

**Purpose:**

- Handles client requests related to authentication, expense submission, reporting, and administrative tasks.
- Manages data persistence and retrieval from the PostgreSQL database.
- Integrates with external services and internal microservices to provide a seamless user experience.
- Enforces business rules and policies, ensuring compliance with company regulations and international tax laws.

**Role within the Application:**

- Acts as the gateway for client applications to interact with backend functionalities.
- Coordinates with other services to process complex workflows such as expense approvals and reimbursements.
- Ensures security through authentication and authorization mechanisms.

This documentation provides detailed instructions for setting up, configuring, and running the main server component, along with explanations of its key modules and functionalities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Configuration](#environment-configuration)
    - [`config.py` Configuration](#configpy-configuration)
  - [Dependency Installation](#dependency-installation)
- [Application Initialization](#application-initialization)
  - [`app.py` Initialization](#apppy-initialization)
  - [Route Registration and Service Integration](#route-registration-and-service-integration)
- [Data Models](#data-models)
  - [`models.py` Overview](#modelspy-overview)
  - [Core Entities](#core-entities)
- [Utility Functions](#utility-functions)
  - [`utils.py` Functions](#utilspy-functions)
    - [Password Hashing](#password-hashing)
    - [Policy Compliance Checks](#policy-compliance-checks)
    - [Notification Sending](#notification-sending)
- [API Routes](#api-routes)
  - [`routes.py` Endpoints](#routespy-endpoints)
  - [Endpoint Details](#endpoint-details)
- [Docker Deployment](#docker-deployment)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
- [Additional Resources](#additional-resources)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- **Python 3.8+**: Ensure that Python is installed on your system.
- **Git**: For cloning the repository.
- **Docker**: Required if you plan to run the application inside a Docker container.
- **PostgreSQL**: The application uses PostgreSQL as the database. Ensure it's installed and running.

## Setup Instructions

### Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker/src/backend/main_server
```

### Environment Configuration

Configuration settings are managed via the `config.py` file, which includes environment variables and database connections.

#### `config.py` Configuration

The `config.py` file provides essential configuration for the application:

- **Database Connection URI**: Specifies the database location and credentials.
- **Secret Keys**: Used for cryptographic operations like JWT token encoding.
- **Debug Mode**: Enables or disables debug mode.

**Requirements Addressed**:

- **Requirement**: Secure storage and management of sensitive configuration data.
- **Technical Specification Location**: [Technical Specification/5.18 Feature ID: F-018 Data Privacy and Security](#)

**Steps**:

1. Create a copy of `config_example.py` and rename it to `config.py`.

   ```bash
   cp config_example.py config.py
   ```

2. Update the configuration variables in `config.py` as per your environment:

   ```python
   DATABASE_URI = 'postgresql://username:password@localhost:5432/expense_db'
   SECRET_KEY = 'your_secret_key'
   DEBUG = True
   ```

### Dependency Installation

All Python dependencies are listed in `requirements.txt`.

Install the dependencies using `pip`:

```bash
pip install -r requirements.txt
```

**Requirements Addressed**:

- **Requirement**: Ensure all necessary packages are installed for the application to run.
- **Technical Specification Location**: [Technical Specification/5.9 Feature ID: F-009 System Integrations](#)

## Application Initialization

### `app.py` Initialization

The `app.py` file is the entry point of the Flask application. It initializes the app, sets up configurations, registers routes, and integrates backend services.

**Functionality**:

- Initializes Flask app with configuration settings from `config.py`.
- Registers Blueprints for modular route management.
- Integrates with the database using SQLAlchemy.
- Sets up authentication mechanisms.

**Requirements Addressed**:

- **Requirement**: Initialize the application with proper configurations and service integrations.
- **Technical Specification Location**: [Technical Specification/5.1 Feature ID: F-001 Secure User Authentication](#)

### Route Registration and Service Integration

In `app.py`, route registration and service integration are handled:

```python
from flask import Flask
from src.routes import auth_routes, expense_routes, report_routes
from config import Config
from src.models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize database
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_routes)
    app.register_blueprint(expense_routes)
    app.register_blueprint(report_routes)

    # Additional service integrations can be added here

    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
```

**Requirements Addressed**:

- **Requirement**: Modular route registration and service integration.
- **Technical Specification Location**: [Technical Specification/5.9 Feature ID: F-009 System Integrations](#)

## Data Models

### `models.py` Overview

The `models.py` file defines the data models for the application, representing core entities like `User`, `ExpenseReport`, and `ExpenseItem`.

**Functionality**:

- Defines database schema using SQLAlchemy ORM.
- Establishes relationships between entities.
- Contains methods for CRUD operations.

**Requirements Addressed**:

- **Requirement**: Accurately represent data entities and their relationships.
- **Technical Specification Location**: [Technical Specification/5.10 Feature ID: F-010 Data Management](#)

### Core Entities

#### User Model

```python
from src.models import db
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'
```

**Requirements Addressed**:

- **Requirement**: Securely store user credentials and manage user roles.
- **Technical Specification Location**: [Technical Specification/5.1 Feature ID: F-001 Secure User Authentication](#)

#### ExpenseReport Model

```python
class ExpenseReport(db.Model):
    __tablename__ = 'expense_reports'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey('users.id'))
    submission_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), nullable=False)
    total_amount = Column(db.Numeric(10, 2), nullable=False)

    user = db.relationship('User', backref='expense_reports')
```

**Requirements Addressed**:

- **Requirement**: Accurately represent expense reports and associate them with users.
- **Technical Specification Location**: [Technical Specification/5.2 Feature ID: F-002 Expense Submission](#)

## Utility Functions

### `utils.py` Functions

The `utils.py` file contains utility functions for operations like password hashing, policy compliance checks, and notification sending.

#### Password Hashing

Uses `bcrypt` library for hashing and verifying passwords.

```python
from bcrypt import hashpw, gensalt, checkpw

def hash_password(plain_text_password):
    return hashpw(plain_text_password.encode('utf-8'), gensalt())

def verify_password(plain_text_password, hashed_password):
    return checkpw(plain_text_password.encode('utf-8'), hashed_password)
```

**Requirements Addressed**:

- **Requirement**: Securely store and verify user passwords.
- **Technical Specification Location**: [Technical Specification/5.1 Feature ID: F-001 Secure User Authentication](#)

#### Policy Compliance Checks

Placeholder function for checking compliance with company policies.

```python
def check_policy_compliance(expense):
    # Logic to check expense against company policies
    pass
```

**Requirements Addressed**:

- **Requirement**: Ensure expenses comply with company policies.
- **Technical Specification Location**: [Technical Specification/5.3 Feature ID: F-003 Policy and Compliance Engine](#)

#### Notification Sending

Function to send notifications to users.

```python
def send_notification(user, message):
    # Logic to send notification (e.g., email, in-app)
    pass
```

**Requirements Addressed**:

- **Requirement**: Notify users of important events.
- **Technical Specification Location**: [Technical Specification/5.17 Feature ID: F-017 Notification and Alerting System](#)

## API Routes

### `routes.py` Endpoints

The `routes.py` file defines API routes for handling requests related to authentication, expense submission, and reporting.

### Endpoint Details

#### Authentication Routes (`auth_routes`)

- **`/auth/login`**: User login.
- **`/auth/register`**: User registration.

**Requirements Addressed**:

- **Requirement**: Provide secure authentication endpoints.
- **Technical Specification Location**: [Technical Specification/5.1 Feature ID: F-001 Secure User Authentication](#)

#### Expense Submission Routes (`expense_routes`)

- **`/expenses`**: Submit a new expense report.
- **`/expenses/<int:id>`**: Retrieve, update, or delete an expense report.

**Requirements Addressed**:

- **Requirement**: Allow users to submit and manage expenses.
- **Technical Specification Location**: [Technical Specification/5.2 Feature ID: F-002 Expense Submission](#)

#### Reporting Routes (`report_routes`)

- **`/reports/expenses`**: Generate expense reports.
- **`/reports/analytics`**: Retrieve analytics data.

**Requirements Addressed**:

- **Requirement**: Provide reporting and analytics functionalities.
- **Technical Specification Location**: [Technical Specification/5.6 Feature ID: F-006 Reporting and Analytics](#)

## Docker Deployment

To ensure a consistent deployment environment, the application is containerized using Docker.

### Building the Docker Image

The `Dockerfile` defines the image setup for the main server.

**Steps**:

1. Build the Docker image:

   ```bash
   docker build -t expense-tracker-main-server .
   ```

**Requirements Addressed**:

- **Requirement**: Define a consistent and portable deployment environment.
- **Technical Specification Location**: [Technical Specification/5.9 Feature ID: F-009 System Integrations](#)

### Running the Docker Container

Run the Docker container with environment variables.

```bash
docker run -d -p 5000:5000 --name expense-tracker-main-server \
  -e DATABASE_URI='postgresql://username:password@db_host:5432/expense_db' \
  -e SECRET_KEY='your_secret_key' \
  expense-tracker-main-server
```

**Requirements Addressed**:

- **Requirement**: Easily deploy and run the application in a containerized environment.
- **Technical Specification Location**: [Technical Specification/5.9 Feature ID: F-009 System Integrations](#)

## Additional Resources

- [Technical Specification Document](../technical_specification.md)
- [API Documentation](../api_documentation.md)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](../CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.