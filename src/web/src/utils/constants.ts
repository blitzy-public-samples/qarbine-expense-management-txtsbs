/**
 * Constants and enumerations used throughout the application.
 * This file addresses multiple requirements from the Technical Specification,
 * including role definitions, localization settings, and security parameters.
 */

//////////////////////////////
// User Roles Enumeration
//////////////////////////////

/**
 * Enumeration for user roles within the application.
 * This addresses TR-F001.4: Define role-based access levels for Employees, Managers, Finance Team, and Administrators.
 * Location: Technical Specification / 5. Features Breakdown / 5.1 Feature ID: F-001 / Technical Requirements
 */
export enum UserRole {
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER',
    FINANCE = 'FINANCE',
    ADMINISTRATOR = 'ADMINISTRATOR',
}

//////////////////////////////
// Localization Constants
//////////////////////////////

/**
 * Supported languages in the application.
 * This addresses TR-F020.1: Provide multi-language support for the user interface.
 * Location: Technical Specification / 5. Features Breakdown / 5.20 Feature ID: F-020 / Technical Requirements
 */
export const SUPPORTED_LANGUAGES: string[] = ['en', 'es', 'fr', 'de', 'zh', 'jp'];

/**
 * Default language setting.
 * This addresses TR-F020.1: Provide multi-language support for the user interface.
 * Location: Technical Specification / 5.20 Feature ID: F-020
 */
export const DEFAULT_LANGUAGE: string = 'en';

/**
 * Date formats based on regional settings.
 * This addresses TR-F020.2: Adapt date, time, and number formats based on regional settings.
 * Location: Technical Specification / 5.20 Feature ID: F-020 / Technical Requirements
 */
export const DATE_FORMATS = {
    en: 'MM/DD/YYYY',
    es: 'DD/MM/YYYY',
    fr: 'DD/MM/YYYY',
    de: 'DD.MM.YYYY',
    zh: 'YYYY/MM/DD',
    jp: 'YYYY/MM/DD',
};

/**
 * Currency formats and symbols.
 * This addresses TR-F020.4: Allow customization of currency symbols and formats.
 * Location: Technical Specification / 5.20 Feature ID: F-020 / Technical Requirements
 */
export const CURRENCY_FORMATS = {
    USD: { symbol: '$', format: '0,0.00' },
    EUR: { symbol: '€', format: '0 0,00' },
    GBP: { symbol: '£', format: '0,0.00' },
    JPY: { symbol: '¥', format: '0,0' },
    // Additional currencies can be added here as needed
};

/**
 * Default currency setting.
 * This addresses TR-F020.4: Allow customization of currency symbols and formats.
 * Location: Technical Specification / 5.20 Feature ID: F-020
 */
export const DEFAULT_CURRENCY: string = 'USD';

//////////////////////////////
// Access Control Constants
//////////////////////////////

/**
 * Access levels for different user roles.
 * This addresses TR-F001.4: Define role-based access levels.
 * Location: Technical Specification / 5.1 Feature ID: F-001 / Technical Requirements
 */
export const ROLE_ACCESS_LEVELS = {
    [UserRole.EMPLOYEE]: 1,
    [UserRole.MANAGER]: 2,
    [UserRole.FINANCE]: 3,
    [UserRole.ADMINISTRATOR]: 4,
};

//////////////////////////////
// Expense Submission Constants
//////////////////////////////

/**
 * Maximum file upload size for receipts (in bytes).
 * This addresses TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
 * Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements
 */
export const MAX_RECEIPT_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Default expense categories.
 * This addresses TR-F002.5: Enable categorization of expenses (e.g., meals, transportation, lodging).
 * Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements
 */
export const EXPENSE_CATEGORIES = [
    'Meals',
    'Transportation',
    'Lodging',
    'Office Supplies',
    'Entertainment',
    'Miscellaneous',
    // Additional categories can be defined here
];

//////////////////////////////
// Policy Compliance Constants
//////////////////////////////

/**
 * Policy validation limits for expense submission.
 * This addresses TR-F003.2: Perform real-time policy checks during expense submission.
 * Location: Technical Specification / 5.3 Feature ID: F-003 / Technical Requirements
 */
export const POLICY_VALIDATION = {
    MAX_EXPENSE_AMOUNT: 1000, // Maximum allowed expense amount without additional approval
    ALLOWED_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'CNY'],
    // Additional policy rules can be added here
};

//////////////////////////////
// Notification Types
//////////////////////////////

/**
 * Notification types used in the application.
 * This addresses TR-F017.6: Allow users to configure their notification preferences.
 * Location: Technical Specification / 5.17 Feature ID: F-017 / Technical Requirements
 */
export const NOTIFICATION_TYPES = {
    EXPENSE_SUBMITTED: 'EXPENSE_SUBMITTED',
    EXPENSE_APPROVED: 'EXPENSE_APPROVED',
    EXPENSE_REJECTED: 'EXPENSE_REJECTED',
    APPROVAL_REQUEST: 'APPROVAL_REQUEST',
    POLICY_UPDATED: 'POLICY_UPDATED',
};

//////////////////////////////
// Security Constants
//////////////////////////////

/**
 * Security parameters for the application.
 * This addresses TR-F018.1: Implement end-to-end encryption for all data transmissions.
 * Location: Technical Specification / 5.18 Feature ID: F-018 / Technical Requirements
 */
export const SECURITY = {
    TOKEN_EXPIRATION_TIME: '1h', // Token expiration time for authentication tokens
    PASSWORD_MIN_LENGTH: 8, // Minimum length for user passwords
    // Note: Actual encryption implementations are handled server-side
};

/**
 * Data protection compliance settings.
 * This addresses TR-F018.2: Comply with data protection regulations such as GDPR and CCPA.
 * Location: Technical Specification / 5.18 Feature ID: F-018 / Technical Requirements
 */
export const DATA_PROTECTION = {
    GDPR_COMPLIANT: true,
    CCPA_COMPLIANT: true,
};

//////////////////////////////
// Performance Optimization Constants
//////////////////////////////

/**
 * Default timeout for API requests (in milliseconds).
 * This addresses TR-F019.1: Achieve app responsiveness with load times under 2 seconds.
 * Location: Technical Specification / 5.19 Feature ID: F-019 / Technical Requirements
 */
export const API_TIMEOUT_MS = 5000; // 5 seconds

/**
 * Maximum number of retries for failed network requests.
 * This addresses TR-F019.5: Conduct regular performance testing and optimization cycles.
 * Location: Technical Specification / 5.19 Feature ID: F-019 / Technical Requirements
 */
export const NETWORK_RETRY_LIMIT = 3;

//////////////////////////////
// Pagination Settings
//////////////////////////////

/**
 * Default pagination settings for data lists.
 * This addresses TR-F011.7: Optimize navigation and workflows for user efficiency.
 * Location: Technical Specification / 5.11 Feature ID: F-011 / Technical Requirements
 */
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    AVAILABLE_PAGE_SIZES: [10, 20, 50, 100],
};

//////////////////////////////
// UI/UX Constants
//////////////////////////////

/**
 * Supported date and time formats for display.
 * This addresses TR-F020.2: Adapt date, time, and number formats based on regional settings.
 * Location: Technical Specification / 5.20 Feature ID: F-020 / Technical Requirements
 */
export const DATE_TIME_FORMATS = {
    'en-US': {
        date: 'MM/DD/YYYY',
        time: 'hh:mm A',
    },
    'en-GB': {
        date: 'DD/MM/YYYY',
        time: 'HH:mm',
    },
    // Additional locale formats can be added here
};

//////////////////////////////
// Regular Expressions for Validation
//////////////////////////////

/**
 * Regular expressions used for form validations.
 * This addresses TR-F002.8: Provide offline mode for expense entry when internet connection is unavailable.
 * Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements
 */
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    // Additional patterns can be defined here
};

/**
 * Offline storage keys for caching data locally.
 * This addresses TR-F008.3: Provide offline mode with data synchronization when online.
 * Location: Technical Specification / 5.8 Feature ID: F-008 / Technical Requirements
 */
export const OFFLINE_STORAGE_KEYS = {
    EXPENSE_DRAFTS: 'expense_drafts',
    RECEIPT_IMAGES: 'receipt_images',
};

//////////////////////////////
// Miscellaneous Constants
//////////////////////////////

/**
 * Application metadata.
 * Includes versioning information and other static data.
 * Useful for compliance with TR-F016.1: Implement logging of all user actions within the application.
 * Location: Technical Specification / 5.16 Feature ID: F-016 / Technical Requirements
 */
export const APP_METADATA = {
    VERSION: '1.0.0',
    BUILD_DATE: '2023-10-01',
};

/**
 * Default settings for the application theme.
 * This addresses TR-F011.4: Allow customization of UI elements to match company branding.
 * Location: Technical Specification / 5.11 Feature ID: F-011 / Technical Requirements
 */
export const THEME_SETTINGS = {
    PRIMARY_COLOR: '#0052CC',
    SECONDARY_COLOR: '#172B4D',
    FONT_FAMILY: 'Arial, sans-serif',
};

//////////////////////////////
// Success Metrics Constants
//////////////////////////////

/**
 * Key Performance Indicators (KPIs) thresholds.
 * This addresses TR-F013.1: Monitor reduction in time spent on expense report submission and approval.
 * Location: Technical Specification / 5.13 Feature ID: F-013 / Technical Requirements
 */
export const KPI_THRESHOLDS = {
    SUBMISSION_TIME_MS: 300000, // Target time for expense submission (in milliseconds)
    APPROVAL_TIME_MS: 86400000, // Target time for expense approval (in milliseconds)
};

//////////////////////////////
// Localization for Right-to-Left (RTL) Languages
//////////////////////////////

/**
 * List of RTL languages supported.
 * This addresses TR-F020.6: Support right-to-left (RTL) languages where applicable.
 * Location: Technical Specification / 5.20 Feature ID: F-020 / Technical Requirements
 */
export const RTL_LANGUAGES = ['ar', 'he'];

/**
 * Flag indicating whether the current language is RTL.
 * Used throughout the application to adjust layouts accordingly.
 */
export function isRTL(languageCode: string): boolean {
    return RTL_LANGUAGES.includes(languageCode);
}