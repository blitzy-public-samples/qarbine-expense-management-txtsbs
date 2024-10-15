import React, { useState, useEffect } from 'react'; // React version 17.0.2
import SettingsPanel from '../components/SettingsPanel';
import LocalizationSwitcher from '../components/LocalizationSwitcher';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { setItem, getItem } from '../services/storage';

// Define an interface for user settings to ensure type safety
interface UserSettings {
  notifications: any; // Replace 'any' with a specific type based on notification preferences structure
  language: string; // Language code, e.g., 'en', 'fr', 'es'
}

// SettingsPage Component
// Renders the settings page with options for managing user preferences, notifications, and localization.
// Requirements Addressed:
// - User Interface Requirements (Technical Specification/5.11 Feature ID: F-011)
//   - Ensure ease of use, accessibility, and adherence to company branding guidelines in the settings interface.
//     - TR-F011.5: Ensure the interface is intuitive and requires minimal training.
//     - TR-F011.3: Maintain consistent branding and design language across all platforms.
// - Localization and Internationalization (Technical Specification/5.20 Feature ID: F-020)
//   - TR-F020.1: Provide multi-language support for the user interface.

const SettingsPage: React.FC = () => {
  // Initialize state variables for storing user settings using useState (React 17.0.2)
  const [userSettings, setUserSettings] = useState<UserSettings>({
    notifications: {}, // Initialize with default notification settings
    language: 'en', // Default language code
  });

  // Retrieve authentication state using useAuth hook
  // Ensures settings are applied for authenticated users
  const { user } = useAuth();

  // Manage notification preferences using useNotifications hook
  const { notificationPreferences, setNotificationPreferences } = useNotifications();

  // Fetch initial settings from local storage on component mount
  useEffect(() => {
    // Use getItem from storage service to retrieve user settings
    const storedSettings = getItem('userSettings');
    if (storedSettings) {
      // If settings exist in local storage, parse and set them to state
      setUserSettings(JSON.parse(storedSettings));
    } else {
      // If no settings are found, initialize with default settings
      const defaultSettings: UserSettings = {
        notifications: notificationPreferences,
        language: 'en',
      };
      setUserSettings(defaultSettings);
      // Store default settings in local storage using setItem
      setItem('userSettings', JSON.stringify(defaultSettings));
    }
    // Empty dependency array ensures this effect runs only once on component mount
  }, []);

  // Handler to update user settings in state and local storage
  const handleSettingsChange = (updatedSettings: UserSettings) => {
    // Update state with new settings
    setUserSettings(updatedSettings);

    // Persist updated settings to local storage
    setItem('userSettings', JSON.stringify(updatedSettings));

    // Update notification preferences if they have changed
    if (
      JSON.stringify(updatedSettings.notifications) !==
      JSON.stringify(notificationPreferences)
    ) {
      setNotificationPreferences(updatedSettings.notifications);
    }

    // Update language settings if they have changed
    if (updatedSettings.language !== userSettings.language) {
      // Implement logic to update application language
      // This may involve updating context or global state
      // Ensures settings changes are reflected in the application
      // Addresses requirement to update relevant contexts or global states
    }
  };

  return (
    <div className="settings-page">
      {/* Render the SettingsPanel component to manage user preferences */}
      {/* Addresses TR-F011.5 by providing an intuitive interface */}
      <SettingsPanel
        settings={userSettings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Include the LocalizationSwitcher component to allow language selection */}
      {/* Addresses TR-F020.1: Provide multi-language support for the user interface */}
      <LocalizationSwitcher
        currentLanguage={userSettings.language}
        onLanguageChange={(languageCode: string) => {
          const updatedSettings: UserSettings = {
            ...userSettings,
            language: languageCode,
          };
          handleSettingsChange(updatedSettings);
        }}
      />
    </div>
  );
};

export default SettingsPage;