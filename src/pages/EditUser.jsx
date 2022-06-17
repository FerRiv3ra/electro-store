import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormUser from '../components/FormUser';
import useDashboard from '../hooks/useDashboard';

const EditUser = () => {
  const { id } = useParams();
  const { users } = useDashboard();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(users.filter((u) => u.uid === id)[0]);
  }, []);

  const { name } = user;

  return (
    <>
      <h1 className="text-xl font-black">Editing: {name}</h1>
      <div className="mt-10 flex justify-center">
        <FormUser user={user} />
      </div>
    </>
  );
};

export default EditUser;
