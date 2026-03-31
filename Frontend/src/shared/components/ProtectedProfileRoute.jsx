import { Outlet } from 'react-router-dom';
import ProfileCompletionGuard from '../../features/profile/components/ProfileCompletionGuard';

const ProtectedProfileRoute = () => {
  return (
    <ProtectedRoute>
      <ProfileCompletionGuard>
        <Outlet />
      </ProfileCompletionGuard>
    </ProtectedRoute>
  );
};

export default ProtectedProfileRoute;
