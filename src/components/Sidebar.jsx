import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.name}</p>
      <Link
        to="add-product"
        className="bg-indigo-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Add product
      </Link>

      <Link
        to="add-category"
        className="bg-indigo-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Add category
      </Link>

      <Link
        to="add-admin"
        className="bg-slate-500 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Add new admin
      </Link>
    </aside>
  );
};

export default Sidebar;
