// Tailwind CSS Configuration File
// Description:
// This configuration file customizes the Tailwind CSS framework for the web application,
// defining theme extensions, plugins, and other settings to ensure consistent styling across
// the application.
//
// Requirements Addressed:
// - Consistent Styling and Cross-Browser Compatibility
//   Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
//   Description: Ensure consistent styling and cross-browser compatibility by configuring CSS processing tools.
//
// Dependencies:
// - External:
//   - tailwindcss (version 2.2.19)
//     Purpose: Utility-first CSS framework for rapid UI development.
// - Internal:
//   - postcss.config.js (src/web/postcss.config.js)
//     Purpose: Integrates Tailwind CSS with PostCSS for processing and optimizing CSS.

// Note: Tailwind CSS is configured through this file to customize the default styles to match the application's branding and design requirements.

module.exports = {
  // Paths to all of the template files in the project
  purge: ['./src/**/*.tsx', './public/index.html'],
  // Enable dark mode based on user's system settings
  darkMode: 'media', // Options: 'media' or 'class' or false

  theme: {
    extend: {
      // Extend the default color palette with custom colors for branding
      colors: {
        // Primary brand color used for links, buttons, etc.
        primary: '#1DA1F2', // Company's primary color
        // Secondary brand color used for accents and highlights
        secondary: '#14171A', // Company's secondary color
        // Additional custom colors can be defined here
      },
      // Extend the spacing scale with custom values
      spacing: {
        '72': '18rem', // Custom spacing value for larger designs
        '84': '21rem',
        '96': '24rem',
        // These custom spacings support design requirements for larger components
      },
      // Additional theme customizations can be added here
    },
  },

  variants: {
    extend: {
      // Enable additional variant for background color on active state
      backgroundColor: ['active'],
      // Enable text color change on visited links
      textColor: ['visited'],
      // Additional variants can be enabled here
    },
  },

  plugins: [
    // Include any necessary plugins for extended functionalities
    // e.g., require('@tailwindcss/forms'),
  ],
};

// Developer Notes:
// - This configuration ensures that the application's styling remains consistent and aligns with the company's branding guidelines.
// - Modifications to this file should be aligned with the User Interface Requirements (Feature ID: F-011).
// - For cross-browser compatibility and consistent styling, ensure that any changes are tested across supported browsers.
// - The integration with PostCSS is configured in 'postcss.config.js' (src/web/postcss.config.js).
// - Tailwind CSS version 2.2.19 is specified to maintain consistency across the development team.