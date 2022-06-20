import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '781312401007-t834j1pljb70k4p5jnq194n8oes73sti.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    const googleButton = document.getElementById('SignInDiv');

    google.accounts.id.renderButton(googleButton, {
      width: 400,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
  }, []);

  async function handleCallbackResponse(response) {
    const body = { id_token: response.credential };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await clienteAxios.post('/auth/google', body, config);

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      setAuth(data.user);
      navigate(data.user.role === 'ADMIN_ROLE' ? '/dashboard' : '/store');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Email and password are required',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/auth/login', {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem('token', data.token);
      setAuth(data.user);
      navigate(data.user.role === 'ADMIN_ROLE' ? '/dashboard' : '/store');
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.msg
          ? error.response.data.msg
          : error.response.data.errors[0].msg,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-indigo-500 font-black text-3xl">
        Electro<span className="text-slate-700">Store</span>
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
        <input
          type="submit"
          value="Login"
          className="bg-indigo-500 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-indigo-600 mb-5 transition-colors"
        />
        <p className="block text-center text-slate-600 mb-3">- O -</p>
        <div id="SignInDiv"></div>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/signup"
          className="block text-center my-5 text-slate-700 uppercase text-sm"
        >
          You don't have an account, sign up
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

export default Login;
