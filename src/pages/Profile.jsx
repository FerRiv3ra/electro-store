import { useEffect, useState } from 'react';
import FormUser from '../components/FormUser';
import useAuth from '../hooks/useAuth';
import NewPassword from './NewPassword';

const Profile = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [newPass, setNewPass] = useState(false);

  const { loading, auth } = useAuth();

  useEffect(() => {
    if (!loading) {
      setUser(auth);
    }
    setEdit(false);
    setNewPass(false);
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handlePass = () => {
    setNewPass(!newPass);
  };

  const { img, name, email } = user;

  return (
    <>
      <div className="flex justify-between bg-white p-10">
        <img
          className="w-64 mr-3 flex-2 align-middle self-start"
          src={
            img
              ? img
              : 'https://res.cloudinary.com/fercloudinary/image/upload/v1655398580/no-image_rek85p.jpg'
          }
        />
        <div className="flex-1 ml-10">
          <p className="font-bold text-xl">{name}</p>
          <p className="font-medium text-xl text-indigo-500 mb-10">{email}</p>
          <button
            onClick={handleEdit}
            className="p-2 bg-indigo-500 rounded-md text-white uppercase text-sm font-semibold my-3 block w-52"
          >
            {edit ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handlePass}
            className="p-2 bg-indigo-500 rounded-md text-white uppercase text-sm font-semibold my-3 block w-52"
          >
            {newPass ? 'Cancel' : 'Chage password'}
          </button>
        </div>
        <div>
          {edit && <FormUser user={user} />}
          {newPass && <FormUser user={user} pass={true} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
