# SQLAlchemy version 1.4.25
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import relationship, declarative_base
# Import the database URL from the configuration file
from config import DATABASE_URL
# Import standard library modules for password hashing
import hashlib
import os

# Create a declarative base class for the ORM models
Base = declarative_base()

class Role(Base):
    """
    Represents a role in the system, defining access levels and permissions for users.

    Addresses requirement:
    - Define role-based access levels for Employees, Managers, Finance Team, and Administrators.
      Requirement ID: TR-F001.4
      Location: Technical Specification/5.1 Feature ID: F-001
    """

    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    def __init__(self, name):
        """
        Initializes a new Role instance with the provided name.

        Parameters:
        - name (string): The name of the role.

        Steps:
        - Assign the name to the instance.
        """
        self.name = name

class User(Base):
    """
    Represents a user in the system with attributes for authentication and authorization.

    Addresses requirements:
    - Implement secure login using unique username and password.
      Requirement ID: TR-F001.1
      Location: Technical Specification/5.1 Feature ID: F-001
    - Implement multi-factor authentication (MFA).
      Requirement ID: TR-F001.2
      Location: Technical Specification/5.1 Feature ID: F-001
    - Define role-based access levels.
      Requirement ID: TR-F001.4
      Location: Technical Specification/5.1 Feature ID: F-001
    """

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey('roles.id'))
    role = relationship('Role')

    def __init__(self, username, email, password_hash, role):
        """
        Initializes a new User instance with the provided attributes.

        Parameters:
        - username (string): The username of the user.
        - email (string): The email address of the user.
        - password_hash (string): The hashed password of the user.
        - role (Role): The role assigned to the user.

        Steps:
        - Assign the username, email, and password_hash to the instance.
        - Set the role for the user.
        """
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.role = role

    def set_password(self, password):
        """
        Sets the user's password by hashing it.

        Addresses requirement:
        - Implement secure login using unique username and password.
          Requirement ID: TR-F001.1
          Location: Technical Specification/5.1 Feature ID: F-001

        Parameters:
        - password (string): The plain text password to be hashed.

        Steps:
        - Generate a random salt.
        - Hash the provided password using PBKDF2_HMAC with SHA256 and the salt.
        - Store the hashed password and the salt in the password_hash attribute.
        """
        salt = os.urandom(16)
        key = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt,
            100000
        )
        self.password_hash = key.hex() + ':' + salt.hex()

    def check_password(self, password):
        """
        Checks if the provided password matches the stored password hash.

        Addresses requirement:
        - Implement secure login using unique username and password.
          Requirement ID: TR-F001.1
          Location: Technical Specification/5.1 Feature ID: F-001

        Parameters:
        - password (string): The password to verify.

        Returns:
        - (boolean): True if the password matches, False otherwise.

        Steps:
        - Split the stored password hash to retrieve the key and the salt.
        - Hash the provided password using the same method and salt.
        - Compare the new hash with the stored hash.
        - Return the result of the comparison.
        """
        stored_key, salt = self.password_hash.split(':')
        key = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            bytes.fromhex(salt),
            100000
        )
        return stored_key == key.hex()

# Create the database engine
engine = create_engine(DATABASE_URL)
# Create all tables in the database
Base.metadata.create_all(engine)