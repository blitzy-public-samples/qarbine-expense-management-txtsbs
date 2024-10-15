# Global Employee Travel Expense Tracking App

## Introduction

The Global Employee Travel Expense Tracking App is designed to streamline the process of submitting, approving, and reimbursing employee travel expenses. This document provides an overview of the application, setup instructions, and usage guidelines.

*This section addresses the requirement for providing comprehensive support resources as specified in [Technical Specification - Feature ID: F-024](Technical%20Specification.md#5.24-feature-id-f-024).*

## Setup Instructions

To set up the application, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourcompany/expense-tracker.git
   ```

2. **Set up the backend services by following the instructions in their respective README files:**

   - **Authentication Service:** Manages user authentication and authorization. Setup instructions are in [src/backend/authentication_service/README.md](src/backend/authentication_service/README.md).

     *Refer to [Authentication Service Documentation](src/backend/authentication_service/README.md) for details. This addresses requirements in [Technical Specification - Section 6.3.2](Technical%20Specification.md#632-backend).*

   - **Policy Engine:** Enforces company-specific expense policies. See [src/backend/policy_engine/README.md](src/backend/policy_engine/README.md).

     *Refer to [Policy Engine Documentation](src/backend/policy_engine/README.md) as per [Feature ID: F-003](Technical%20Specification.md#5.3-feature-id-f-003).*

   - **Notification Service:** Sends alerts and updates to users. Instructions are in [src/backend/notification_service/README.md](src/backend/notification_service/README.md).

     *See [Notification Service Documentation](src/backend/notification_service/README.md), addressing [Feature ID: F-017](Technical%20Specification.md#5.17-feature-id-f-017).*

   - **Reporting Module:** Provides analytics and reporting tools. Setup details are in [src/backend/reporting_module/README.md](src/backend/reporting_module/README.md).

     *Refer to [Reporting Module Documentation](src/backend/reporting_module/README.md) related to [Feature ID: F-006](Technical%20Specification.md#5.6-feature-id-f-006).*

   - **Main Server Application:** Initializes the main server and integrates backend services. Instructions are in [src/backend/main_server/README.md](src/backend/main_server/README.md).

3. **Configure the infrastructure using Terraform:**

   - Follow the instructions in [infrastructure/README.md](infrastructure/README.md) to set up AWS infrastructure components.

     *This step aligns with the infrastructure setup described in [Technical Specification - Section 6.6](Technical%20Specification.md#66-scalability-and-reliability).*

   - Apply the Terraform configuration:

     ```bash
     cd infrastructure
     terraform init
     terraform apply
     ```

4. **Install dependencies for the web and mobile applications:**

   - **Web Application:**

     ```bash
     cd src/web
     npm install
     ```

     *Dependencies are defined in [src/web/package.json](src/web/package.json).*

   - **Mobile Application:**

     ```bash
     cd src/web/src/mobile
     yarn install
     ```

     *Refer to [Mobile App Package Configuration](src/web/src/mobile/package.json) for dependencies.*

5. **Deploy the application using the provided CI/CD workflows:**

   - **CI Workflow:** Automates build and test processes. See [ .github/workflows/ci.yml](.github/workflows/ci.yml).

   - **CD Workflow:** Automates deployment to the cloud infrastructure. See [ .github/workflows/cd.yml](.github/workflows/cd.yml).

     *These workflows are critical for continuous integration and deployment, addressing [Technical Specification - Section 6.9](Technical%20Specification.md#69-deployment-strategy).*

## Usage

The application provides a web interface for managing expenses, approvals, and reports. Users can log in using their corporate credentials and access features based on their roles:

- **Employees:** Submit expense reports, upload receipts, and track reimbursement status.
- **Managers:** Review and approve expense reports from team members.
- **Finance Team:** Access all expense reports, generate financial reports, and process reimbursements.
- **Administrators:** Manage user accounts, configure system settings, and oversee compliance.

*Usage guidelines address user experience requirements outlined in [Feature ID: F-011](Technical%20Specification.md#5.11-feature-id-f-011).*

## Key Components

The application consists of several key components:

### Authentication Service

Manages user authentication and authorization, including MFA and SSO integration.

- **Source Code:** [src/backend/authentication_service/](src/backend/authentication_service/)
- **Documentation:** [README.md](src/backend/authentication_service/README.md)

*Addresses [Technical Specification - Feature ID: F-001](Technical%20Specification.md#5.1-feature-id-f-001).*

### Policy Engine

Enforces company-specific expense policies and international tax regulations.

- **Source Code:** [src/backend/policy_engine/](src/backend/policy_engine/)
- **Documentation:** [README.md](src/backend/policy_engine/README.md)

*Implements requirements from [Feature ID: F-003](Technical%20Specification.md#5.3-feature-id-f-003).*

### Notification Service

Sends alerts and updates to users regarding expense statuses and policy changes.

- **Source Code:** [src/backend/notification_service/](src/backend/notification_service/)
- **Documentation:** [README.md](src/backend/notification_service/README.md)

*Related to [Feature ID: F-017](Technical%20Specification.md#5.17-feature-id-f-017).*

### Reporting Module

Provides analytics and reporting tools for expenses and compliance.

- **Source Code:** [src/backend/reporting_module/](src/backend/reporting_module/)
- **Documentation:** [README.md](src/backend/reporting_module/README.md)

*Fulfills requirements from [Feature ID: F-006](Technical%20Specification.md#5.6-feature-id-f-006).*

### Database

Stores all application data securely.

- **Schema and Migrations:** Located in [src/database/](src/database/)
- **Documentation:** [README.md](src/database/README.md)

*Ensures data management as per [Feature ID: F-010](Technical%20Specification.md#5.10-feature-id-f-010).*

## Contributing

Contributions are welcome. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file and ensure all code passes the CI checks before submitting a pull request.

*Adheres to collaborative practices outlined in [Technical Specification - Section 7](Technical%20Specification.md#7-system-components).*

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

*For licensing details, refer to [LICENSE](LICENSE).*

---

*This README addresses the requirement for providing comprehensive training materials and support resources to facilitate user adoption, as specified in [Technical Specification - Feature ID: F-024](Technical%20Specification.md#5.24-feature-id-f-024).*