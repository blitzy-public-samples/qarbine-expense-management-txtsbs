// MainActivity.kt
// The MainActivity class serves as the main entry point for the Android version of the Global Employee Travel Expense Tracking App.
// It integrates with the React Native framework to render the mobile application, manage lifecycle events, and configure Android-specific settings.

// Addressing Requirement:
// Name: Mobile Features
// Location: Technical Specification/5.8 Feature ID: F-008
// Description: Enhance the mobile application with support for cross-platform usage, push notifications, offline capabilities, and secure storage of receipts and travel documents to facilitate on-the-go expense management.

package com.company

// Importing Android classes
import android.os.Bundle
import android.app.Application

// Importing React Native classes (version 0.64.2)
// com.facebook.react:react-native:0.64.2
import com.facebook.react.ReactActivity // React Native Activity class
import com.facebook.react.ReactRootView // React Native root view

/**
 * The MainActivity class manages the lifecycle of the Android application,
 * integrating with React Native and handling system events.
 */
class MainActivity : ReactActivity() {

    /**
     * A ReactRootView instance that manages the app's main view.
     */
    private lateinit var reactRootView: ReactRootView

    /**
     * Initializes the MainActivity with default settings.
     * Steps:
     * 1. Set up the ReactRootView instance to manage the app's main view.
     * 2. Initialize any necessary services or configurations for the app.
     */
    init {
        // Step 1: Set up the ReactRootView instance
        reactRootView = ReactRootView(this)

        // Step 2: Initialize any necessary services or configurations for the app.
        // (No additional services specified in the current specification)
    }

    /**
     * Initializes the Android application, setting up the React Native environment
     * and configuring initial settings.
     *
     * @param savedInstanceState The saved instance state Bundle.
     *
     * Steps:
     * 1. Call the superclass's onCreate method to perform default initialization.
     * 2. Initialize the React Native bridge and set up the main application view.
     * 3. Configure any necessary Android-specific settings, such as permissions and lifecycle listeners.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        // Step 1: Call the superclass's onCreate method
        super.onCreate(savedInstanceState)

        // Step 2: Initialize the React Native bridge and set up the main application view
        reactRootView.startReactApplication(
            reactInstanceManager, // Provided by ReactActivity
            mainComponentName,    // Name of the main component registered from JavaScript
            null                  // Initial properties (none specified)
        )

        // Set the content view to the ReactRootView
        setContentView(reactRootView)

        // Step 3: Configure any necessary Android-specific settings
        // (No specific settings detailed in the current specification)
    }

    /**
     * Called when the application resumes, used to restart any tasks that were paused.
     *
     * Steps:
     * 1. Resume any tasks that were paused (or not yet started) while the application was inactive.
     */
    override fun onResume() {
        super.onResume()

        // Step 1: Resume any paused tasks
        // (No specific tasks detailed in the current specification)
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     *
     * @return The name of the main component.
     */
    override fun getMainComponentName(): String? {
        // The main component is defined in src/web/src/mobile/App.tsx
        // Internal Dependency: MobileApp
        return "MobileApp"
    }
}