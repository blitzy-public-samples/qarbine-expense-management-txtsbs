// src/web/postcss.config.js

// Description:
// This configuration file sets up PostCSS for processing CSS files in the web application.
// It integrates plugins such as Tailwind CSS for utility-first styling and Autoprefixer for adding vendor prefixes,
// ensuring cross-browser compatibility.

// Requirements Addressed:
// - Consistent Styling and Cross-Browser Compatibility
//   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
//   - Description: Ensure consistent styling and cross-browser compatibility by configuring CSS processing tools.

// External Dependencies:
// - postcss (version 8.3.6): A tool for transforming CSS with JavaScript plugins.
// - tailwindcss (version 2.2.19): Utility-first CSS framework for rapid UI development.
// - autoprefixer (version 10.2.5): A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.
// - cssnano (version 5.0.8): A modular minifier built on top of the PostCSS ecosystem.

// Internal Dependencies:
// - tailwind.config.js: Customizes Tailwind CSS framework settings for consistent styling.
//   Located at: './src/web/tailwind.config.js'

// Export the PostCSS configuration object
module.exports = {
    // Specify the PostCSS plugins to be used during CSS processing
    plugins: [
        // Tailwind CSS plugin integration (version 2.2.19)
        // Purpose: Integrate Tailwind CSS utility classes for rapid UI development and consistent styling.
        // Requirement Addressed:
        //   - Consistent Styling
        //   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
        require('tailwindcss')('./src/web/tailwind.config.js'),

        // Autoprefixer plugin integration (version 10.2.5)
        // Purpose: Automatically add vendor prefixes to CSS rules for cross-browser compatibility.
        // Requirement Addressed:
        //   - Cross-Browser Compatibility
        //   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
        require('autoprefixer'),

        // cssnano plugin integration (version 5.0.8)
        // Purpose: Optimize and minify CSS for production builds to improve performance.
        require('cssnano')({
            preset: 'default',
        }),
    ],
};