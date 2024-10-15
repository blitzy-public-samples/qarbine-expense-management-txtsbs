// Importing necessary libraries and components
import React from 'react'; // React version 17.0.2

/******************************************************************
 * Importing internal constants and utility functions
 * These imports are necessary for the Footer component to function correctly.
 * - API_BASE_URL: To provide a consistent base URL for any API-related links or references in the footer.
 * - formatDate: To format any date-related information displayed in the footer.
 * - validateEmail: To ensure any email addresses displayed or linked in the footer are correctly formatted.
 ******************************************************************/
import { API_BASE_URL } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import { validateEmail } from '../utils/validation';

/**
 * Footer Component
 * 
 * Renders the footer component with links and information relevant to the application.
 * 
 * Requirements Addressed:
 * - User Interface Requirements
 *   Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   Description: Maintain consistent branding and design language across all platforms,
 *   ensuring ease of use, accessibility, and adherence to company branding guidelines.
 * 
 * Technical Requirements Addressed:
 * - TR-F011.1: Develop a responsive web application for desktop use.
 * - TR-F011.3: Maintain consistent branding and design language across all platforms.
 * - TR-F011.5: Ensure the interface is intuitive and requires minimal training.
 * - TR-F011.6: Incorporate accessibility features compliant with WCAG 2.1 guidelines.
 */

const Footer: React.FC = () => {
    /**
     * Step 1: Obtain the current year dynamically.
     * - Uses the formatDate utility function to format the current year.
     * - Ensures that the displayed year is always up-to-date.
     * 
     * Addresses:
     * - TR-F011.3: Maintain consistent branding and design language across all platforms.
     */
    const currentYear: string = formatDate(new Date(), 'YYYY');

    /**
     * Step 2: Define and validate the contact email address.
     * - The email address is validated using the validateEmail utility function.
     * - If the email is invalid, the contact email link will not be rendered.
     * 
     * Addresses:
     * - Ensures accurate and reliable contact information is displayed to users.
     */
    const contactEmail: string = 'support@company.com';
    const isEmailValid: boolean = validateEmail(contactEmail);

    return (
        /**
         * Step 3: Define the footer layout using HTML and JSX, ensuring it is responsive.
         * - Uses responsive design techniques and CSS classes to adapt to different screen sizes.
         * - Ensures the footer is accessible and adheres to company branding guidelines.
         * 
         * Addresses:
         * - TR-F011.1: Develop a responsive web application for desktop use.
         * - TR-F011.3: Maintain consistent branding and design language across all platforms.
         * - TR-F011.5: Ensure the interface is intuitive and requires minimal training.
         * - TR-F011.6: Incorporate accessibility features compliant with WCAG 2.1 guidelines.
         */
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* 
                    Company Logo or Branding
                    - Displays the company name or logo as a link to the home page.
                    - Ensures consistent branding across the application.
                    - Addresses TR-F011.3.
                */}
                <div className="mb-4 md:mb-0">
                    <a href="/" className="text-2xl font-bold">
                        {/* Replace with company logo if available */}
                        Company Name
                    </a>
                </div>
                {/*
                    Navigation Links
                    - Includes links to Privacy Policy, Terms of Service, and Contact Us.
                    - Uses the API_BASE_URL constant for consistent URL referencing.
                    - Addresses TR-F011.3 and ensures compliance with company policies.
                */}
                <div className="flex flex-col md:flex-row md:items-center">
                    <a
                        href={`${API_BASE_URL}/privacy-policy`}
                        className="md:mx-2 my-1 md:my-0 hover:underline"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href={`${API_BASE_URL}/terms-of-service`}
                        className="md:mx-2 my-1 md:my-0 hover:underline"
                    >
                        Terms of Service
                    </a>
                    {/*
                        Conditional rendering of Contact Us link
                        - Only displays if the contact email is valid.
                        - Ensures users receive accurate contact information.
                    */}
                    {isEmailValid && (
                        <a
                            href={`mailto:${contactEmail}`}
                            className="md:mx-2 my-1 md:my-0 hover:underline"
                        >
                            Contact Us
                        </a>
                    )}
                </div>
                {/*
                    Current Year Display
                    - Displays the current year dynamically.
                    - Ensures up-to-date information is presented to users.
                    - Addresses TR-F011.3.
                */}
                <div className="mt-4 md:mt-0 text-center md:text-right">
                    <p>
                        &copy; {currentYear} Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

/**
 * Notes:
 * - This component uses internal dependencies to ensure consistency and correctness:
 *   - API_BASE_URL (from constants.ts): Provides a consistent base URL for links.
 *   - formatDate (from formatters.ts): Formats date-related information.
 *   - validateEmail (from validation.ts): Validates email addresses before use.
 * - The design adheres to accessibility standards (WCAG 2.1), with readable text, sufficient contrast, and responsive layout.
 * - All elements follow the company's branding guidelines, ensuring a consistent user experience.
 */