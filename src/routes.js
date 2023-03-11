import { Navigate, useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
// import BillsList from './pages/Employee/BillsList';
// import BillForm from './pages/Employee/BillForm';
// import BillFormUpdate from './pages/Employee/BillFormUpdate';
// import BillStatus from './pages/Employee/BillStatus';
// import AcBillList from './pages/Accountant/AcBillList';
// import ACBillStatus from './pages/Accountant/ACBillStatus';
// import ProfileUpdateForm from './pages/Employee/ProfileUpdateForm';
import UserPage from './pages/UserPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';
import { userStore } from './store';

// ----------------------------------------------------------------------

function Router() {
  console.log(userStore.userLoginSuccess)
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (userStore.userLoginSuccess) ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'department', element: <UserPage /> },
        // { path: 'bill', element: <BillsList /> },
        // { path: 'newuser', element: <BillForm /> },
        // { path: 'userprofile', element: <ProfileUpdateForm /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}


export default observer(Router);