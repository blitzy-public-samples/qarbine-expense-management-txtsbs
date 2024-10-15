import React, { useEffect, useState, useContext } from 'react';

// External dependencies
// Importing axios version 0.21.1 for performing HTTP requests to the backend API for fetching localization data.
import axios from 'axios'; // version 0.21.1

// Internal dependencies

// Importing API_BASE_URL to construct API endpoints for localization requests.
import { API_BASE_URL } from '../utils/constants';

// Importing formatDate and formatCurrency to format dates and currency values according to the selected localization.
import { formatDate, formatCurrency } from '../utils/formatters';

// Importing validateDate to ensure date inputs are valid for the selected localization.
import { validateDate } from '../utils/validation';

// Importing useAuth hook to manage authentication state and ensure localization settings are applied for authenticated users.
import { useAuth } from '../hooks/useAuth';

// Importing useExpenseData to retrieve and manage expense data that may be affected by localization changes.
import { useExpenseData } from '../hooks/useExpenseData';

// Importing LocalizationContext to manage global localization state.
import { LocalizationContext } from '../context/LocalizationContext';

/**
 * LocalizationSwitcher Component
 *
 * This component provides a user interface element for switching between different language localizations
 * in the web application. It allows users to select their preferred language, which updates the application's
 * displayed language accordingly.
 *
 * Requirements Addressed:
 * - Localization and Internationalization
 *   - Location: Technical Specification/5.20 Feature ID: F-020/Localization and Internationalization
 *   - Description: Support multiple languages and regional settings to cater to a global user base, ensuring
 *     that the application is accessible and user-friendly for employees across different countries.
 *     - TR-F020.1: Provide multi-language support for the user interface.
 *     - TR-F020.2: Adapt date, time, and number formats based on regional settings.
 *     - TR-F020.4: Allow customization of currency symbols and formats.
 *     - TR-F020.5: Translate all user-facing text accurately and contextually.
 */

const LocalizationSwitcher: React.FC = () => {
    // Use useAuth hook to manage authentication state and ensure localization settings are applied for authenticated users.
    const { isAuthenticated, user } = useAuth();

    // Access the global localization context to get and set the current language.
    const { language, setLanguage, translate } = useContext(LocalizationContext);

    // State to store the list of available languages fetched from the backend.
    const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

    // Fetch expense data that may be affected by localization changes.
    const { expenses } = useExpenseData();

    // Effect hook to fetch available languages when the component mounts.
    useEffect(() => {
        // Define an asynchronous function to fetch languages.
        const fetchLanguages = async () => {
            try {
                // Perform a GET request to the backend API to retrieve available languages.
                const response = await axios.get(`${API_BASE_URL}/localization/languages`);
                // Set the available languages in the state.
                setAvailableLanguages(response.data.languages);
            } catch (error) {
                // Handle any errors that occur during the request.
                console.error('Error fetching available languages:', error);
            }
        };

        // Call the fetchLanguages function.
        fetchLanguages();
    }, []); // Empty dependency array ensures this runs once on component mount.

    // Function to handle changes in language selection.
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;

        // Update the application's global state or context to reflect the new language selection.
        setLanguage(selectedLanguage);

        // Optionally, if the user is authenticated, save the preference to the backend.
        if (isAuthenticated) {
            // Update the user's preferred language in the backend.
            axios
                .post(`${API_BASE_URL}/users/${user.id}/language`, { language: selectedLanguage })
                .then(() => {
                    console.log('User language preference updated successfully.');
                })
                .catch((error) => {
                    console.error('Error updating user language preference:', error);
                });
        }
    };

    // Example of formatting current date and a sample amount based on the selected localization.
    // Addresses TR-F020.2: Adapt date, time, and number formats based on regional settings.
    const formattedDate = formatDate(new Date(), language);

    // Addresses TR-F020.4: Allow customization of currency symbols and formats.
    const sampleAmount = 1234.56;
    const formattedCurrency = formatCurrency(sampleAmount, language);

    // Validation example: ensuring a sample date is valid according to the selected localization.
    const sampleDateInput = '2024-02-29';
    const isValidDate = validateDate(sampleDateInput, language);

    // Render the component.
    return (
        <div className="localization-switcher">
            {/* Label translated according to selected language, addressing TR-F020.5 */}
            <label htmlFor="language-select">{translate('Language')}:</label>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                {availableLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>

            {/* Display formatted date and currency examples */}
            <div className="localization-examples">
                <p>
                    {translate('Current Date')}: {formattedDate}
                </p>
                <p>
                    {translate('Sample Amount')}: {formattedCurrency}
                </p>
                <p>
                    {translate('Is')} '{sampleDateInput}' {translate('a valid date')}?{' '}
                    {isValidDate ? translate('Yes') : translate('No')}
                </p>
            </div>

            {/* Display expense data affected by localization changes */}
            <div className="expense-data">
                <h3>{translate('Your Expenses')}:</h3>
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {formatDate(expense.date, language)} -{' '}
                            {formatCurrency(expense.amount, language)} - {translate(expense.description)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LocalizationSwitcher;