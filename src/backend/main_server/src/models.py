"""
Defines the data models for the main server component of the Global Employee Travel Expense Tracking App.
These models represent the core entities such as users, expenses, policies, and departments, and are used
to interact with the database.
"""

# Third-party imports with version numbers as comments
from sqlalchemy import Column, Integer, String, Date, Numeric, ForeignKey  # SQLAlchemy version 1.4.25
from sqlalchemy.ext.declarative import declarative_base  # SQLAlchemy version 1.4.25
from sqlalchemy.orm import relationship  # SQLAlchemy version 1.4.25
import bcrypt  # bcrypt version 3.2.0
import jwt  # PyJWT version 2.3.0
import datetime

# Base class for declarative class definitions
Base = declarative_base()

class Department(Base):
    """
    Represents a department within the organization.

    This class addresses the following requirements:
    - Administration and Configuration
        - Location: Technical Specification/5.12 Feature ID: F-012
        - Description: Allows the definition of organizational structures such as departments for user management.

    Attributes:
        department_id (int): Unique identifier for the department.
        department_name (str): Name of the department.
    """

    __tablename__ = 'departments'

    department_id = Column(Integer, primary_key=True, autoincrement=True)
    department_name = Column(String(255), nullable=False)

    # Relationships
    employees = relationship('Employee', back_populates='department')

    def __init__(self, department_name):
        """
        Initializes a Department instance with the provided attributes.

        Parameters:
            department_name (str): Name of the department.

        Steps:
        - Assigns the provided department_name to the instance.
        """
        self.department_name = department_name

class Employee(Base):
    """
    Represents an employee in the system, including personal details and departmental affiliation.

    This class addresses the following requirements:
    - User Interface Requirements
        - Location: Technical Specification/5.11 Feature ID: F-011
        - Description: Provides necessary employee data to support user profile interfaces and role assignments.
    - Data Management
        - Location: Technical Specification/5.10 Feature ID: F-010
        - Description: Ensures secure and efficient management of employee data within the application.

    Attributes:
        employee_id (int): Unique identifier for the employee.
        first_name (str): Employee's first name.
        last_name (str): Employee's last name.
        email (str): Employee's email address.
        role (str): Role of the employee (e.g., Employee, Manager).
        department_id (int): Identifier for the employee's department.
    """

    __tablename__ = 'employees'

    employee_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(50), nullable=False)
    department_id = Column(Integer, ForeignKey('departments.department_id'))

    # Relationships
    department = relationship('Department', back_populates='employees')
    user = relationship('User', back_populates='employee', uselist=False)
    expenses = relationship('Expense', back_populates='employee')
    expense_reports = relationship('ExpenseReport', back_populates='employee')

    def __init__(self, first_name, last_name, email, role, department_id):
        """
        Initializes an Employee instance with the provided attributes.

        Parameters:
            first_name (str): Employee's first name.
            last_name (str): Employee's last name.
            email (str): Employee's email address.
            role (str): Role of the employee.
            department_id (int): Identifier for the employee's department.

        Steps:
        - Assigns the provided first_name to the instance.
        - Assigns the provided last_name to the instance.
        - Assigns the provided email to the instance.
        - Assigns the provided role to the instance.
        - Assigns the provided department_id to the instance.
        """
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.role = role
        self.department_id = department_id

class User(Base):
    """
    Represents a user in the system, including authentication credentials and role information.

    This class addresses the following requirements:
    - Secure User Authentication and Role-Based Authorization
        - Location: Technical Specification/5.1 Feature ID: F-001
        - Description: Supports secure login, role-based access, and integration with identity providers for authentication and authorization.

    Attributes:
        user_id (int): Unique identifier for the user.
        username (str): The username of the user.
        password_hash (str): The hashed password for secure authentication.
        role (str): The role of the user (e.g., Employee, Manager, Admin).
        employee_id (int): The associated employee ID.
    """

    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    employee_id = Column(Integer, ForeignKey('employees.employee_id'), nullable=False)

    # Relationships
    employee = relationship('Employee', back_populates='user')

    def __init__(self, username, password, role, employee_id):
        """
        Initializes a User instance with the provided attributes.

        Parameters:
            username (str): The username of the user.
            password (str): The plaintext password (will be hashed before storing).
            role (str): The role of the user (e.g., Employee, Manager, Admin).
            employee_id (int): The associated employee ID.

        Steps:
        - Assigns the provided username to the instance.
        - Hashes the provided password and assigns the hash to the instance.
        - Assigns the provided role to the instance.
        - Assigns the provided employee_id to the instance.
        """
        self.username = username
        self.set_password(password)
        self.role = role
        self.employee_id = employee_id

    def set_password(self, password):
        """
        Hashes a user's password and stores it securely in the database.

        This method addresses:
        - Secure User Authentication
            - Location: Technical Specification/5.1 Feature ID: F-001
            - Description: Ensures secure storage and verification of user passwords.

        Parameters:
            password (str): The plaintext password to be hashed.

        Steps:
        - Hashes the password using bcrypt.
        - Stores the hashed password in the password_hash attribute.
        """
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, password):
        """
        Verifies a user's password against the stored hash.

        Parameters:
            password (str): The plaintext password to verify.

        Returns:
            bool: True if the password matches, False otherwise.

        Steps:
        - Hashes the provided password with the stored salt.
        - Compares the hashed password with the stored password_hash.
        - Returns True if they match, False otherwise.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def generate_auth_token(self, secret_key, expires_in=3600):
        """
        Generates an authentication token for the user.

        This method addresses:
        - Secure User Authentication
            - Location: Technical Specification/5.1 Feature ID: F-001
            - Description: Supports token generation for authentication.

        Parameters:
            secret_key (str): The secret key used to encode the JWT.
            expires_in (int): Token expiration time in seconds.

        Returns:
            str: The encoded JWT token.

        Steps:
        - Creates a payload containing the user's ID and expiration time.
        - Encodes the payload using JWT with the secret key.
        - Returns the encoded token.
        """
        payload = {
            'user_id': self.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        }
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token

    @staticmethod
    def verify_auth_token(token, secret_key):
        """
        Verifies an authentication token and retrieves the user ID.

        This method addresses:
        - Secure User Authentication
            - Location: Technical Specification/5.1 Feature ID: F-001
            - Description: Supports token validation for authentication.

        Parameters:
            token (str): The JWT token to verify.
            secret_key (str): The secret key used to decode the JWT.

        Returns:
            int: The user ID if token is valid, None otherwise.

        Steps:
        - Decodes the token using the secret key.
        - Retrieves the user ID from the payload.
        - Returns the user ID if token is valid.
        """
        try:
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            return payload['user_id']
        except jwt.ExpiredSignatureError:
            # Token has expired
            return None
        except jwt.InvalidTokenError:
            # Token is invalid
            return None

class ExpenseReport(Base):
    """
    Represents an expense report submitted by an employee.

    This class addresses the following requirements:
    - Expense Submission
        - Location: Technical Specification/5.2 Feature ID: F-002
        - Description: Allows employees to submit expense reports.
    - Approval Workflows
        - Location: Technical Specification/5.4 Feature ID: F-004
        - Description: Manages the status of expense reports throughout the approval process.

    Attributes:
        report_id (int): Unique identifier for the expense report.
        employee_id (int): Reference to the submitting employee.
        submission_date (date): Date of report submission.
        status (str): Current status of the report (e.g., Pending, Approved, Rejected).
        total_amount (decimal): Total amount of expenses in the report.
    """

    __tablename__ = 'expense_reports'

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey('employees.employee_id'), nullable=False)
    submission_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)

    # Relationships
    employee = relationship('Employee', back_populates='expense_reports')
    expenses = relationship('Expense', back_populates='expense_report', cascade='all, delete-orphan')

    def __init__(self, employee_id, submission_date, status, total_amount):
        """
        Initializes an ExpenseReport instance with the provided attributes.

        Parameters:
            employee_id (int): Reference to the submitting employee.
            submission_date (date): Date of report submission.
            status (str): Current status of the report.
            total_amount (decimal): Total amount of expenses in the report.

        Steps:
        - Assigns the provided employee_id to the instance.
        - Assigns the provided submission_date to the instance.
        - Assigns the provided status to the instance.
        - Assigns the provided total_amount to the instance.
        """
        self.employee_id = employee_id
        self.submission_date = submission_date
        self.status = status
        self.total_amount = total_amount

class Expense(Base):
    """
    Represents an expense item submitted by an employee, including details such as category,
    amount, and associated report.

    This class addresses the following requirements:
    - Expense Submission
        - Location: Technical Specification/5.2 Feature ID: F-002
        - Description: Supports capturing and storing expense details, including categories, amounts, and receipts.
    - Policy and Compliance Engine
        - Location: Technical Specification/5.3 Feature ID: F-003
        - Description: Ensures that all submitted expenses adhere to configurable company policies and international tax laws by performing real-time policy checks and applying relevant regulations automatically.
    - Approval Workflows
        - Location: Technical Specification/5.4 Feature ID: F-004
        - Description: Facilitates the storage of approval statuses and history for expense reports.

    Attributes:
        expense_id (int): Unique identifier for the expense.
        report_id (int): The ID of the associated expense report.
        employee_id (int): The ID of the employee who submitted the expense.
        category (str): The category of the expense (e.g., Meals, Transportation).
        amount (decimal): The amount of the expense.
        currency (str): The currency in which the expense was made.
        expense_date (date): The date when the expense was incurred.
        description (str): A description of the expense.
    """

    __tablename__ = 'expenses'

    expense_id = Column(Integer, primary_key=True, autoincrement=True)
    report_id = Column(Integer, ForeignKey('expense_reports.report_id'), nullable=False)
    employee_id = Column(Integer, ForeignKey('employees.employee_id'), nullable=False)
    category = Column(String(100), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(10), nullable=False)
    expense_date = Column(Date, nullable=False)
    description = Column(String(255))

    # Relationships
    employee = relationship('Employee', back_populates='expenses')
    expense_report = relationship('ExpenseReport', back_populates='expenses')

    def __init__(self, report_id, employee_id, category, amount, currency, expense_date, description):
        """
        Initializes an Expense instance with the provided attributes.

        Parameters:
            report_id (int): The ID of the associated expense report.
            employee_id (int): The ID of the employee who submitted the expense.
            category (str): The category of the expense (e.g., Meals, Transportation).
            amount (Decimal): The amount of the expense.
            currency (str): The currency in which the expense was made.
            expense_date (date): The date when the expense was incurred.
            description (str): A description of the expense.

        Steps:
        - Assigns the provided report_id to the instance.
        - Assigns the provided employee_id to the instance.
        - Assigns the provided category to the instance.
        - Assigns the provided amount to the instance.
        - Assigns the provided currency to the instance.
        - Assigns the provided expense_date to the instance.
        - Assigns the provided description to the instance.
        """
        self.report_id = report_id
        self.employee_id = employee_id
        self.category = category
        self.amount = amount
        self.currency = currency
        self.expense_date = expense_date
        self.description = description

class Policy(Base):
    """
    Represents a company policy governing expense submissions.

    This class addresses the following requirements:
    - Policy and Compliance Engine
        - Location: Technical Specification/5.3 Feature ID: F-003
        - Description: Provides a mechanism to define and enforce expense policies.

    Attributes:
        policy_id (int): Unique identifier for the policy.
        policy_name (str): Name of the policy.
        description (str): Detailed description of the policy.
        max_amount (decimal): Maximum allowed amount for the policy.
        applicable_regions (str): Regions where the policy is applicable.
    """

    __tablename__ = 'policies'

    policy_id = Column(Integer, primary_key=True, autoincrement=True)
    policy_name = Column(String(255), nullable=False)
    description = Column(String(255))
    max_amount = Column(Numeric(10, 2), nullable=False)
    applicable_regions = Column(String(255))

    def __init__(self, policy_name, description, max_amount, applicable_regions):
        """
        Initializes a Policy instance with the provided attributes.

        Parameters:
            policy_name (str): Name of the policy.
            description (str): Detailed description of the policy.
            max_amount (decimal): Maximum allowed amount for the policy.
            applicable_regions (str): Regions where the policy is applicable.

        Steps:
        - Assigns the provided policy_name to the instance.
        - Assigns the provided description to the instance.
        - Assigns the provided max_amount to the instance.
        - Assigns the provided applicable_regions to the instance.
        """
        self.policy_name = policy_name
        self.description = description
        self.max_amount = max_amount
        self.applicable_regions = applicable_regions