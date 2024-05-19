import { Navigate, Outlet } from 'react-router-dom';
import { useScript } from '../../contexts';

const Protected = ({ children }) => {
  const { isLoggedIn } = useScript();
  if (!isLoggedIn) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }
  return children;
};
export default Protected;
