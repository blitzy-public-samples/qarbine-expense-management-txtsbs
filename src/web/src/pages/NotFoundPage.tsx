// External dependencies
import React from 'react'; // Importing React (version 17.0.2) to create and manage the component lifecycle and rendering.

// Internal dependencies
import Header from '../components/Header'; // Importing Header component to provide consistent navigation and branding at the top of the page.
import Footer from '../components/Footer'; // Importing Footer component to maintain consistent branding and provide additional navigation links at the bottom of the page.

/**
 * NotFoundPage Component
 *
 * Renders the NotFoundPage component with a message indicating the page was not found
 * and provides options to navigate back to the home page or other main sections.
 *
 * This component addresses the following requirement:
 * - Ensure the interface is intuitive and requires minimal training, providing clear feedback for navigation errors.
 *   Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *
 * Steps:
 * 1. Import the Header and Footer components to maintain consistent layout and branding.
 * 2. Define a message indicating that the requested page could not be found.
 * 3. Provide navigation options for the user to return to the home page or other main sections.
 * 4. Render the Header component at the top of the page.
 * 5. Display the not found message prominently in the center of the page.
 * 6. Render navigation links to guide the user back to the main sections.
 * 7. Render the Footer component at the bottom of the page to complete the layout.
 *
 * @returns {JSX.Element} A JSX element representing the 404 Not Found page.
 */
const NotFoundPage: React.FC = () => {
  // Step 2: Define a message indicating that the requested page could not be found.
  const message = 'Sorry, the page you are looking for does not exist.';

  // Step 3: Provide navigation options for the user to return to the home page or other main sections.
  const navigationOptions = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Expense Submission', path: '/expense-submission' },
    { name: 'Reports', path: '/reports' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div>
      {/* Step 4: Render the Header component at the top of the page. */}
      <Header />

      {/* Step 5: Display the not found message prominently in the center of the page. */}
      <main style={styles.main}>
        <h1 style={styles.title}>{message}</h1>

        {/* Step 6: Render navigation links to guide the user back to the main sections. */}
        <p style={styles.text}>
          Please use the links below to navigate to a different section:
        </p>
        <ul style={styles.navList}>
          {navigationOptions.map((option) => (
            <li key={option.path} style={styles.navItem}>
              <a href={option.path} style={styles.navLink}>
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      </main>

      {/* Step 7: Render the Footer component at the bottom of the page to complete the layout. */}
      <Footer />
    </div>
  );
};

// Styles for the NotFoundPage component to maintain consistent branding and user interface aesthetics.
const styles = {
  main: {
    textAlign: 'center' as const,
    padding: '50px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1em',
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: 0,
    display: 'inline-block',
    textAlign: 'left' as const,
  },
  navItem: {
    marginBottom: '10px',
  },
  navLink: {
    color: '#007BFF',
    textDecoration: 'none' as const,
    fontSize: '1em',
  },
};

export default NotFoundPage;