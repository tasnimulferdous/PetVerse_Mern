import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="petverse-header">
      <h1 className="petverse-logo">PetVerse</h1>
    </div>
  );
};

export default Navbar;