import { useEffect } from 'react';
import UserPreview from '../components/UserPreview';
import useDashboard from '../hooks/useDashboard';

const Users = () => {
  const { users, setSearch, search } = useDashboard();
  useEffect(() => {
    setSearch('');
  }, []);

  const usersArr = users.filter(
    (us) =>
      us.name.toLowerCase().includes(search.toLowerCase()) ||
      us.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {usersArr.length ? (
          usersArr.map((user) => <UserPreview key={user.uid} user={user} />)
        ) : (
          <p className="text-center text-slate-700 uppercase p-4">
            Nothing to show
          </p>
        )}
      </div>
    </>
  );
};

export default Users;
