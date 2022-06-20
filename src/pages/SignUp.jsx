import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, confirmPassword].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        msg: 'Passwords no match',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    if (password.length < 8) {
      setAlert({
        msg: 'Passwords too short, min 8 charaters',
        error: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    setAlert({});

    try {
      const { data } = await clienteAxios.post(`/users`, {
        name,
        email,
        password,
      });

      setAlert({ msg: data.msg });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg
          ? error.response.data.msg
          : error.response.data.errors[0].msg,
        error: true,
      });
    }
    window.scrollTo(0, 0);
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-indigo-500 font-black text-3xl">
        SingUp to Electro<span className="text-slate-700">Store</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-5 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 text-lg font-bold block"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            className="uppercase text-gray-600 text-lg font-bold block"
            htmlFor="password"
          >
            Password
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
          value="SignUp"
          className="bg-indigo-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-indigo-600 mb-5 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-700 uppercase text-sm"
        >
          Alredy have an account, login
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-5 text-slate-700 uppercase text-sm"
        >
          Forgot password?
        </Link>
      </nav>
    </>
  );
};

export default SignUp;
