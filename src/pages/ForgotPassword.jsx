import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlert({ msg: 'Email is required', error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/users/forgot-password', {
        email,
      });

      setAlert({ msg: data.msg });
    } catch (error) {
      setAlert({
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
        Forgot <span className="text-slate-700">Password</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-5 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 text-lg font-bold block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Recover password"
          className="bg-indigo-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-indigo-600 mb-5 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/signup"
          className="block text-center my-5 text-slate-700 uppercase text-xs"
        >
          You don't have an account, sign up
        </Link>
        <Link
          to="/"
          className="block text-center my-5 text-slate-700 uppercase text-xs"
        >
          Alredy have an account, login
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
