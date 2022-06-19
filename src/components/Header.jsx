import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useDashboard from '../hooks/useDashboard';

const Header = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const { search, setSearch, shoping_cart } = useDashboard();

  const handleClick = () => {
    const email = localStorage.getItem('email');

    if (auth.uid) {
      if (email && email === auth.email) {
        google.accounts.id.disableAutoSelect();

        google.accounts.id.revoke(localStorage.getItem('email'), (done) => {
          localStorage.removeItem('email');
          location.reload();
        });
        localStorage.removeItem('token');
      }

      navigate('/');
    } else {
      navigate('/login');
    }
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-2xl text-sky-500 font-black text-center">
          Ecommerce <span className="text-slate-500">FerRivera</span>
        </h2>
        <input
          type="search"
          placeholder="Search"
          className="rounded-lg lg:w-96 block p-2 border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-4">
          {auth.role !== 'ADMIN_ROLE' && (
            <div>
              <Link to="shoping-cart">
                {shoping_cart.length ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                )}
              </Link>
            </div>
          )}
          <Link
            to={auth.role === 'ADMIN_ROLE' ? '/dashboard' : 'profile'}
            className="font-bold uppercase"
          >
            {auth.role === 'ADMIN_ROLE' ? 'Dashboard' : 'Profile'}
          </Link>
          <button
            className="text-white text-sm bg-sky-500 p-3 rounded-md uppercase font-bold"
            onClick={handleClick}
          >
            {auth.uid ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
