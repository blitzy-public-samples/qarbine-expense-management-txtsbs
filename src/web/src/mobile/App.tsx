// src/web/src/mobile/App.tsx

// Importing React to use JSX syntax and component features.
// React version 17.0.2
import React from 'react';

// Importing React Native components for building native mobile interfaces.
// Version as per package.json dependencies
import { StyleSheet } from 'react-native';

// Importing navigation components to manage navigation between screens.
// Using React Navigation for routing, as per Technical Specification/6.3.1 Frontend
import { NavigationContainer } from '@react-navigation/native'; // Version as per package.json dependencies
import { createStackNavigator } from '@react-navigation/stack';

// Importing internal components specific to the mobile application.
// MobileSpecificComponent integrates mobile-specific functionalities and UI elements.
// Location: src/web/src/mobile/components/MobileSpecificComponent.tsx
import MobileSpecificComponent from './components/MobileSpecificComponent';

// MobileLoginPage handles user authentication on mobile devices.
// Location: src/web/src/mobile/pages/MobileLoginPage.tsx
import MobileLoginPage from './pages/MobileLoginPage';

// MobileExpenseSubmissionPage provides a user interface for submitting expenses on mobile devices.
// Location: src/web/src/mobile/pages/MobileExpenseSubmissionPage.tsx
import MobileExpenseSubmissionPage from './pages/MobileExpenseSubmissionPage';

// Importing custom hooks for state and data management.
// useAuth manages authentication state and provides login functionality.
// Location: src/web/src/hooks/useAuth.ts
import { useAuth } from '../../hooks/useAuth';

// useExpenseData manages and submits expense data.
// Location: src/web/src/hooks/useExpenseData.ts
import { useExpenseData } from '../../hooks/useExpenseData';

// useNotifications manages notification data and displays alerts.
// Location: src/web/src/hooks/useNotifications.ts
import { useNotifications } from '../../hooks/useNotifications';

// Importing services for API requests and data storage.
// api handles API requests related to mobile-specific functionalities.
// Location: src/web/src/services/api.ts
import api from '../../services/api';

// auth authenticates users and manages session tokens.
// Location: src/web/src/services/auth.ts
import auth from '../../services/auth';

// storage manages local storage operations for mobile-specific data.
// Location: src/web/src/services/storage.ts
import storage from '../../services/storage';

// notification fetches and manages notifications for mobile users.
// Location: src/web/src/services/notification.ts
import notification from '../../services/notification';

// reporting generates reports and analytics for mobile users.
// Location: src/web/src/services/reporting.ts
import reporting from '../../services/reporting';

// Creating a Stack Navigator for navigation between screens.
const Stack = createStackNavigator();

// MobileApp function renders the main mobile application component, integrating navigation and mobile-specific features.
// Addresses requirement: Enhance the mobile application with support for cross-platform usage, per Technical Specification/5.8 Feature ID: F-008
const MobileApp: React.FC = () => {
  // Initializing authentication state using useAuth hook.
  // Manages user login state and provides authentication functionality.
  const { isAuthenticated } = useAuth();

  // Initializing expense data management using useExpenseData hook.
  // Manages expense submission and data synchronization.
  const { syncExpenses } = useExpenseData();

  // Initializing notifications using useNotifications hook.
  // Manages in-app notifications and alerts for the user.
  const { fetchNotifications } = useNotifications();

  // useEffect to handle lifecycle events and side effects.
  // Fetches initial data and configures settings when the app loads.
  React.useEffect(() => {
    // Fetch notifications when the app starts.
    fetchNotifications();

    // Synchronize expense data when the app starts.
    syncExpenses();

    // Additional initialization logic can be added here.
  }, []);

  // Rendering the main application layout using NavigationContainer.
  // Sets up navigation between different pages/screens.
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'ExpenseSubmission' : 'Login'}>
        {/* MobileLoginPage handles user authentication on mobile devices.
            Ensures secure login, meeting requirements in Technical Specification/5.1 Feature ID: F-001 */}
        <Stack.Screen
          name="Login"
          component={MobileLoginPage}
          options={{ headerShown: false }}
        />
        {/* MobileExpenseSubmissionPage allows users to submit expenses on mobile devices.
            Addresses the need for on-the-go expense management per Technical Specification/5.2 Feature ID: F-002 */}
        <Stack.Screen
          name="ExpenseSubmission"
          component={MobileExpenseSubmissionPage}
          options={{ headerShown: false }}
        />
        {/* Additional screens can be added here */}
      </Stack.Navigator>
      {/* MobileSpecificComponent integrates mobile-specific functionalities and UI elements.
          Enhances user experience on mobile devices as per Technical Specification/5.8 Feature ID: F-008 */}
      <MobileSpecificComponent />
    </NavigationContainer>
  );
};

export default MobileApp;

// Styles for the mobile application can be defined here.
// Ensuring responsiveness and usability on mobile devices, as per Technical Specification/5.8 Feature ID: F-008
const styles = StyleSheet.create({
  // Define styles for components
});