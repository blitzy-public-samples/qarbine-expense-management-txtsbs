// src/web/src/mobile/index.tsx

// Importing React version 17.0.2 to create and manage component lifecycle and state
import React from 'react'; // Version 17.0.2

// Importing ReactDOM version 17.0.2 to render React components into the DOM
import ReactDOM from 'react-dom'; // Version 17.0.2

// Importing MobileApp to render the main mobile application component
import MobileApp from './App';

// Importing mobile-specific components and pages for integration
import MobileSpecificComponent from './components/MobileSpecificComponent';
import MobileLoginPage from './pages/MobileLoginPage';
import MobileExpenseSubmissionPage from './pages/MobileExpenseSubmissionPage';

/**
 * Function: initializeMobileApp
 * Description: Initializes the mobile application by rendering the main MobileApp component
 * and setting up necessary configurations.
 *
 * Requirements Addressed:
 * - Mobile Features (Technical Specification/5.8 Feature ID: F-008)
 *   - Enhance the mobile application with support for cross-platform usage,
 *     push notifications, offline capabilities, and secure storage of receipts
 *     and travel documents to facilitate on-the-go expense management.
 *
 * Steps:
 * 1. Import React and ReactDOM for rendering components.
 * 2. Import the MobileApp component from src/web/src/mobile/App.tsx.
 * 3. Use ReactDOM to render the MobileApp component into the root element of the mobile application.
 * 4. Ensure that the application is wrapped with necessary providers for state management and routing.
 */
function initializeMobileApp(): void {
    // Rendering the MobileApp component into the root element
    // Wrapping with React.StrictMode to highlight potential problems in the application
    // Ensuring that the application is wrapped with necessary providers for state management and routing

    ReactDOM.render(
        <React.StrictMode>
            <MobileApp />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// Initialize the mobile application
initializeMobileApp();