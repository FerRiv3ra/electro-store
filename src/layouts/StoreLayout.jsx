import { Outlet } from 'react-router-dom';
import FiltersSidebar from '../components/FiltersSideBar';
import Header from '../components/Header';

const StoreLayout = () => {
  return (
    <>
      <div className="bg-gray-100">
        <Header />

        <div className="md:flex md:min-h-screen">
          <FiltersSidebar />
          <main className="p-7 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
