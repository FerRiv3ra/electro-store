import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';
import useDashboard from '../hooks/useDashboard';

const NewPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [changedPass, setChangedPass] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { showAlert } = useDashboard();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clienteAxios(`/users/forgot-password/${token}`);

        setValidToken(true);
      } catch (error) {
        showAlert({
          error: true,
          msg: error.response.data.msg
            ? error.response.data.msg
            : error.response.data.errors[0].msg,
        });
      }
    };

    return () => verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([password, confirmPassword].includes('')) {
      showAlert({
        msg: 'Password and confirm password are required',
        error: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      showAlert({ msg: 'Passwords no match', error: true });
      return;
    }

    if (password < 8) {
      showAlert({
        msg: 'Passwords too short, min 8 charaters',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/users/forgot-password/${token}`,
        { password }
      );

      showAlert({ msg: data.msg });

      setPassword('');
      setConfirmPassword('');
      setChangedPass(true);
    } catch (error) {
      showAlert({
        msg: error.response.data.msg
          ? error.response.data.msg
          : error.response.data.errors[0].msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-indigo-500 font-black text-3xl">
        New <span className="text-slate-700">Password</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-5 bg-white shadow rounded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-lg font-bold block"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 text-lg font-bold block"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Save new password"
            className="bg-indigo-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-indigo-600 mb-5 transition-colors"
          />
        </form>
      )}
      {changedPass && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default NewPassword;
