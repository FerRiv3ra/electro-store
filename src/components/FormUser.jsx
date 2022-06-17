import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import Alert from './Alert';

const FormUser = ({ user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [imgName, setImgName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const { showAlert, alert, addAdminUser, editUser } = useDashboard();

  useEffect(() => {
    if (id) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email].includes('')) {
      showAlert({
        msg: 'Name, email and password are required',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (!id && !password) {
      showAlert({
        msg: 'Name, email and password are required',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (password !== confirmPassword) {
      showAlert({
        msg: 'Passwords no match',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (!id && password.length < 8) {
      showAlert({
        msg: 'Passwords too short, min 8 charaters',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (!imgName && name === user.name) {
      showAlert({
        msg: 'Nothing to do',
      });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/dashboard');
      }, 3600);
      return;
    }

    const file = new FormData();
    file.append('file', img);

    let data;
    if (!id) {
      data = await addAdminUser({
        name,
        email,
        password,
        file,
        imgName,
      });
    } else {
      data = await editUser(id, {
        name,
        email,
        password,
        file,
        imgName,
      });
    }

    if (data.code) {
      showAlert({
        msg: data.response.data.msg
          ? data.response.data.msg
          : data.response.data.errors[0].msg,
        error: true,
      });
      return;
    }

    showAlert({
      msg: `${id ? 'Success: profile updated' : `Admin user ${name} added`}`,
    });

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      navigate('/dashboard');
    }, 3600);
  };

  const { msg } = alert;

  return (
    <form className="bg-white p-5 md:w-2/3 rounded-lg" onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      <div className="my-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          readOnly={id ? true : false}
          disabled={id ? true : false}
          className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="image"
        >
          Profile picture
        </label>
        <input
          id="image"
          type="file"
          className="border w-full p-2 mt-1 placeholder-gray-400 rounded-md"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          value={imgName}
          onChange={(e) => {
            setImg(e.target.files[0]);
            setImgName(e.target.value);
          }}
        />
        {user && user.img && (
          <p className=" text-xs">
            *There is an image stored, if you want to change it, upload another
            one
          </p>
        )}
      </div>
      {!user && (
        <div>
          <div className="my-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      )}
      <input
        type="submit"
        value={user ? 'Save changes' : 'Add Admin'}
        className="bg-sky-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-600 mb-5 transition-colors"
      />
    </form>
  );
};

export default FormUser;
