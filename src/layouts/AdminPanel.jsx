import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

const AdminPanel = () => {
  const { auth, loading } = useAuth();
  if (loading) return 'Loading...';
  return (
    <>
      {auth.role === 'ADMIN_ROLE' ? (
        <div className="bg-gray-100">
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AdminPanel;
