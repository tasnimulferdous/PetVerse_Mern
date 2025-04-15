import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // State to store the current user
  const [currentUser, setCurrentUser] = useState(null);
  // State to store the authentication token
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  // State to track if we're still loading user data
  const [loading, setLoading] = useState(true);

  // Effect to run when the component mounts or token changes
  useEffect(() => {
    // If we have a token, set up axios and try to fetch the user
    if (token) {
      // Set up axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Function to fetch user profile
      const fetchUserProfile = async () => {
        try {
          // Get user ID from token by decoding JWT
          const tokenParts = token.split('.');
          const payload = tokenParts[1];
          const decodedPayload = atob(payload);
          const payloadData = JSON.parse(decodedPayload);
          const userId = payloadData._id;
          
          // Fetch the user profile using the API
          const response = await axios.get(`http://localhost:3000/auth/get_profile_1068/${userId}`);
          
          // If successful, update the user state
          if (response.data.success) {
            setCurrentUser(response.data.user);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // If there's an error, log out the user
          logout();
        } finally {
          // Set loading to false either way
          setLoading(false);
        }
      };
      
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]); // Re-run this effect when token changes

  // Function to handle user login
  const login = async (credentials) => {
    try {
      // Call the login API
      const response = await axios.post('http://localhost:3000/auth/login_1068', credentials);
      
      // If login was successful
      if (response.data.success) {
        // Save the token to local storage
        localStorage.setItem('token', response.data.jwtToken);
        // Update the token state
        setToken(response.data.jwtToken);
        // Set axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`;
        
        // Get user ID from token
        const tokenParts = response.data.jwtToken.split('.');
        const payload = tokenParts[1];
        const decodedPayload = atob(payload);
        const payloadData = JSON.parse(decodedPayload);
        const userId = payloadData._id;
        
        // Fetch user profile
        const userResponse = await axios.get(`http://localhost:3000/auth/get_profile_1068/${userId}`);
        
        // Update user state if successful
        if (userResponse.data.success) {
          setCurrentUser(userResponse.data.user);
        }
        
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      // Handle login errors
      let errorMessage = 'An error occurred during login';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    }
  };

  // Function to handle user signup
  const signup = async (userData) => {
    try {
      // Call the signup API
      const response = await axios.post('http://localhost:3000/auth/signup_1068', userData);
      return { 
        success: response.data.success, 
        message: response.data.message 
      };
    } catch (error) {
      // Handle signup errors
      let errorMessage = 'An error occurred during signup';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      // Call the logout API
      await axios.post('http://localhost:3000/auth/logout_1068');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clean up regardless of API success
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Function to update user profile
  const updateProfile = async (userData) => {
    try {
      // Call the update profile API
      const response = await axios.put('http://localhost:3000/auth/update_profile_1068', userData);
      
      // If update was successful
      if (response.data.success) {
        // Update the current user state
        setCurrentUser(response.data.user);
        return { success: true, message: 'Profile updated successfully' };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      // Handle update errors
      let errorMessage = 'An error occurred while updating profile';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    }
  };

  // Create the value object to be provided by the context
  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  // Provide the context value to all children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;