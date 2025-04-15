import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    location: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  // State for form errors
  const [errors, setErrors] = useState({});
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the signup function and navigation
  const { signup } = useAuth();
  const navigate = useNavigate();

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
    
    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form first
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Remove confirmPassword and username from data sent to server
      // (since our API doesn't have username field)
      const { confirmPassword, username, ...userData } = formData;
      
      // Call the signup function from auth context
      const result = await signup(userData);
      
      if (result.success) {
        // Show success message and navigate to login page
        toast.success('Account created successfully! Please login.');
        navigate('/login');
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          location: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        // Show error message
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="signup-container">
        {/* Left side of the form */}
        <div className="signup-left">
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
        </div>
        
        {/* Right side of the form */}
        <div className="signup-right">
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <input
              type="text"
              name="username"
              className="gray-input"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="form-error">{errors.username}</div>}
            
            {/* Password Input */}
            <input
              type="password"
              name="password"
              className="gray-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
            
            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              className="gray-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            
            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-green"
              disabled={isLoading}
              style={{ marginTop: "2rem" }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;