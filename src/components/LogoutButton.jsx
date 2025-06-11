// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored auth/session data
    localStorage.clear();
    sessionStorage.clear();

    // Optional: clear cookies if you use them
    document.cookie = '';

    // Redirect to login or home page
    navigate('/login'); // or navigate('/')
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
