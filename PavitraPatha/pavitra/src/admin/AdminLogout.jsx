import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    // Redirect to login
    navigate('/admin/login');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default AdminLogout;