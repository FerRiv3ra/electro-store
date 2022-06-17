import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useDashboard from '../hooks/useDashboard';

const Header = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const { search, setSearch } = useDashboard();

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
