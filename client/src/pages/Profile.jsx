import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <div>No user information available.</div>;
  }

  const handleEditProfile = () => {
    navigate('/update-profile');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="form-container">
      <div className="login-container" style={{ marginTop: '2rem' }}>
        <div className="profile-header">
          <h2 className="profile-title">My Profile</h2>
          <button 
            className="btn btn-green" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
        
        <div className="profile-content" style={{ marginTop: '2rem' }}>
          <div className="profile-field" style={{ backgroundColor: '#f8f8d9', padding: '1rem', borderRadius: '15px', marginBottom: '1rem' }}>
            <div className="profile-label" style={{ fontWeight: 'bold' }}>Name</div>
            <div className="profile-value">{currentUser.name}</div>
          </div>
          
          <div className="profile-field" style={{ backgroundColor: '#f8f8d9', padding: '1rem', borderRadius: '15px', marginBottom: '1rem' }}>
            <div className="profile-label" style={{ fontWeight: 'bold' }}>Email</div>
            <div className="profile-value">{currentUser.email}</div>
          </div>
          
          <div className="profile-field" style={{ backgroundColor: '#f8f8d9', padding: '1rem', borderRadius: '15px', marginBottom: '1rem' }}>
            <div className="profile-label" style={{ fontWeight: 'bold' }}>Phone Number</div>
            <div className="profile-value">{currentUser.phone_number}</div>
          </div>
          
          {currentUser.location && (
            <div className="profile-field" style={{ backgroundColor: '#f8f8d9', padding: '1rem', borderRadius: '15px', marginBottom: '1rem' }}>
              <div className="profile-label" style={{ fontWeight: 'bold' }}>Location</div>
              <div className="profile-value">{currentUser.location}</div>
            </div>
          )}
        </div>

        <button 
          className="btn btn-red" 
          onClick={handleLogout}
          style={{ marginTop: '2rem' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;