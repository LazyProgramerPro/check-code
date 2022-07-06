import { Navigate } from 'react-router-dom';
import { getToken } from './common';

const PublicRoute = ({ children }) => {
  return !getToken() ? children : <Navigate to="/" />;
};

export default PublicRoute;
