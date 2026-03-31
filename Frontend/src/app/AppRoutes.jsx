import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import { Suspense } from 'react';
import { env } from '../shared/config/env';
import AddWorkshiftPage from '../features/workshift/pages/AddWorkshiftPage';
import EditWorkshiftPage from '../features/workshift/pages/EditWorkshiftPage';
import WorkshiftsPage from '../features/workshift/pages/WorkshiftsPage';
import BookingsPage from '../features/booking/pages/BookingsPage';
import CompleteProfilePage from '../features/profile/pages/CompleteProfilePage';
import SignupPage from '../features/auth/pages/SignupPage';
import LoginPage from '../features/auth/pages/LoginPage';
import AccountPage from '../features/profile/pages/AccountPage';
import ProtectedRoute from '../shared/Components/ProtectedRoute';
import DesignSandbox from '../../DesignSandbox';
import NotFoundPage from '../shared/pages/NotFoundPage';
import ProtectedProfileRoute from '../shared/components/ProtectedProfileRoute';
import Loader from '../shared/components/Loader';
import Layout from '../shared/components/Layout';

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* DesignSandbox */}
        {env.enableDevAuthBypass && (
          <Route path="/dev/design" element={<DesignSandbox />} />
        )}

        {/* Public routes */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.HOME} element={<WorkshiftsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTES.COMPLETE_PROFILE}
            element={<CompleteProfilePage />}
          />
        </Route>

        <Route element={<ProtectedProfileRoute />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.ADD_WORKSHIFT} element={<AddWorkshiftPage />} />
            <Route
              path={ROUTES.EDIT_WORKSHIFT}
              element={<EditWorkshiftPage />}
            />
            <Route path={ROUTES.BOOKINGS} element={<BookingsPage />} />
            <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
