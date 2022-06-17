import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { DashboardProvider } from './context/DashboardProvider';
import AdminPanel from './layouts/AdminPanel';
import AuthLayout from './layouts/AuthLayout';
import AddProduct from './pages/AddProduct';
import Confirm from './pages/Confirm';
import Products from './pages/Products';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import AddCategory from './pages/AddCategory';
import AddAdmin from './pages/AddAdmin';
import Product from './pages/Product';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import EditProduct from './pages/EditProduct';
import StoreLayout from './layouts/StoreLayout';
import Store from './pages/Store';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:token" element={<Confirm />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/dashboard" element={<AdminPanel />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-admin" element={<AddAdmin />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/store" element={<StoreLayout />}>
              <Route index element={<Store />} />
            </Route>
          </Routes>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
