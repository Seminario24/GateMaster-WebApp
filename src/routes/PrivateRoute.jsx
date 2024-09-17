import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Verificar si existe el token en el localStorage
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
