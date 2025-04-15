import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!identifier.trim()) {
      newErrors.identifier = 'Email or Phone Number is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      let credentials = {
        password: password
      };
      
      if (identifier.includes('@')) {
        credentials.email = identifier;
      } else {
        credentials.phone_number = identifier;
      }
      
      const result = await login(credentials);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/profile');
        
        setIdentifier('');
        setPassword('');
      } else {
        toast.error(result.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="login-container">
        <h2 className="form-title">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="pink-input"
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          {errors.identifier && <div className="form-error">{errors.identifier}</div>}
          
          <input
            type="password"
            className="pink-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="form-error">{errors.password}</div>}
          
          <div style={{ textAlign: 'center', marginTop: '-0.8rem', marginBottom: '1.5rem' }}>
            <Link to="/forgot-password" style={{ color: '#FF5252', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
              Forget Password
            </Link>
          </div>
          
          <button
            type="submit"
            className="btn btn-green"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>OR</span>
          </div>
          
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button 
              type="button" 
              className="btn btn-red"
            >
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;