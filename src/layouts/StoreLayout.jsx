import { Outlet, useLocation } from 'react-router-dom';
import FiltersSidebar from '../components/FiltersSideBar';
import Header from '../components/Header';

const StoreLayout = () => {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  return (
    <>
      <div className="bg-gray-100">
        <Header />

        <div className="md:flex md:min-h-screen">
          {current !== 'shopping-cart' &&
            current !== 'checkout' &&
            current !== 'product' &&
            current !== 'profile' && <FiltersSidebar />}
          <main className="p-7 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
