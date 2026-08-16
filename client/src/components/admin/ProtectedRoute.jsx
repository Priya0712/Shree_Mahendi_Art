import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/admin';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={`${adminPath}/login`} replace />;
};

export default ProtectedRoute;
