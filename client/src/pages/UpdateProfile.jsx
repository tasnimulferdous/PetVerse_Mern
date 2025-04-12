import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const UpdateProfile = () => {
  // Get current user and update profile function from auth context
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    location: ''
  });
  
  // State for form errors
  const [errors, setErrors] = useState({});
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when current user changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone_number: currentUser.phone_number || '',
        location: currentUser.location || ''
      });
    }
  }, [currentUser]);

  // If no current user, show loading message
  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate phone number
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    } else if (formData.phone_number.length < 10) {
      newErrors.phone_number = 'Phone number must be at least 10 digits';
    } else if (formData.phone_number.length > 15) {
      newErrors.phone_number = 'Phone number must not exceed 15 digits';
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Add userId to the update data
      const updateData = {
        ...formData,
        userId: currentUser._id
      };
      
      // Call the update profile function
      const result = await updateProfile(updateData);
      
      if (result.success) {
        // Show success message and navigate to profile page
        toast.success('Profile updated successfully!');
        navigate('/profile');
      } else {
        // Show error message
        toast.error(result.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Update profile error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="form-container">
      <div className="signup-container">
        {/* Left side - Form */}
        <div className="signup-left">
          <h2 className="form-title">Update Profile</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <input
              type="text"
              name="name"
              className="cream-input"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
            
            {/* Email Input */}
            <input
              type="email"
              name="email"
              className="cream-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
            
            {/* Phone Number Input */}
            <input
              type="text"
              name="phone_number"
              className="cream-input"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && <div className="form-error">{errors.phone_number}</div>}
            
            {/* Location Input */}
            <input
              type="text"
              name="location"
              className="cream-input"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <div className="form-error">{errors.location}</div>}
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                type="submit"
                className="btn btn-green"
                disabled={isLoading}
                style={{ flex: 1 }}
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
              
              <button
                type="button"
                className="btn btn-red"
                onClick={handleCancel}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
        {/* Right side - Information */}
        <div className="signup-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '80%' }}>
            <h3 style={{ marginBottom: '2rem' }}>Edit Your Profile</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Update your personal information to keep your account details current.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginTop: '2rem' }}>
              Your pet will thank you for keeping your information up to date!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;