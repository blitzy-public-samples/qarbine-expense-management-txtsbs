import React, { useState, useEffect } from 'react';

/**
 * External Dependencies
 * 
 * axios is used to perform HTTP requests to the backend API for fetching and updating user profile data.
 * Version: 0.21.1
 */
import axios from 'axios'; // axios version 0.21.1

/**
 * Internal Dependencies
 * 
 * - API_BASE_URL from constants.ts to construct API endpoints.
 * - formatDate from formatters.ts to format registration dates.
 * - validateEmail from validation.ts to validate email inputs.
 * - useAuth from useAuth.ts to manage authentication state.
 * - useNotifications from useNotifications.ts to manage notifications.
 * - getNotifications from notification.ts to fetch profile-related notifications.
 * - login from auth.ts to re-authenticate users if necessary.
 * - setItem from storage.ts to store profile data locally.
 */
import { API_BASE_URL } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import { validateEmail } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { getNotifications } from '../services/notification';
import { login } from '../services/auth';
import { setItem } from '../services/storage';

/**
 * Global Constants
 * 
 * PROFILE_STORAGE_KEY is used as the key to store and retrieve user profile data from local storage.
 */
const PROFILE_STORAGE_KEY = 'user_profile';

/**
 * UserProfile Component
 * 
 * Description:
 * Renders the user's profile information and provides functionalities to update it.
 * 
 * Requirements Addressed:
 * - User Profile Management
 *   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   - Description: Ensure the interface is intuitive and requires minimal training, allowing users to easily manage their profile information.
 */
const UserProfile: React.FC = () => {
  /**
   * Utilize useAuth hook to manage authentication state and ensure profile updates are performed for authenticated users.
   */
  const { user, updateUser } = useAuth();

  /**
   * Utilize useNotifications hook to manage notifications related to profile updates.
   */
  const { notify } = useNotifications();

  /**
   * State for profile information, editing status, and form errors.
   */
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: '',
    registrationDate: ''
  });
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    email: ''
  });

  /**
   * Effect hook to fetch user profile data when the component mounts.
   * 
   * Step 1: Fetch the user's profile data from the backend API using axios.
   */
  useEffect(() => {
    axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        // Include authentication token in request headers.
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => {
      const data = response.data;
      setProfile({
        name: data.name,
        email: data.email,
        profilePicture: data.profilePicture,
        registrationDate: data.registrationDate
      });
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
      notify('Error fetching profile data.', 'error');
    });
  }, [user.token, notify]);

  /**
   * Handler for input changes in the profile edit form.
   * 
   * Step 3: Provide input fields for the user to update their profile information.
   * Step 4: Validate the updated email address using validateEmail.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Invalid email address.'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: ''
        }));
      }
    }
  };

  /**
   * Handler for submitting the profile update form.
   * 
   * Step 5: Submit the updated profile information to the backend API.
   * Step 6: Update the local storage with the new profile data using setItem.
   * Step 7: Use the useNotifications hook to display success or error notifications based on the update result.
   */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent submission if there are validation errors.
    if (errors.email) {
      notify('Please fix the errors before submitting.', 'warning');
      return;
    }

    axios.put(`${API_BASE_URL}/user/profile`, profile, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => {
      const updatedProfile = response.data;
      setProfile(updatedProfile);

      // Update local storage with new profile data.
      setItem(PROFILE_STORAGE_KEY, updatedProfile);

      // Update authentication state with new profile data.
      updateUser(updatedProfile);

      // Notify user of successful update.
      notify('Profile updated successfully.', 'success');
      setEditing(false);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      notify('Error updating profile.', 'error');

      // Re-authenticate user if token has expired.
      if (error.response && error.response.status === 401) {
        login();
      }
    });
  };

  /**
   * Handler to initiate profile editing.
   */
  const handleEditClick = () => {
    setEditing(true);
  };

  /**
   * Handler to cancel profile editing.
   */
  const handleCancelClick = () => {
    setEditing(false);
    // Optionally reset profile data to original values.
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      
      <div className="profile-picture">
        <img src={profile.profilePicture} alt="Profile" />
      </div>

      {!editing ? (
        /**
         * Display user's profile information.
         * 
         * Step 2: Display the user's profile information including name, email, and profile picture.
         */
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Registration Date:</strong> {formatDate(profile.registrationDate)}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      ) : (
        /**
         * Render form to edit profile information.
         */
        <form onSubmit={handleFormSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Additional fields for updating profile picture or other details can be added here. */}

          <div className="form-actions">
            <button type="submit" disabled={!!errors.email}>Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;