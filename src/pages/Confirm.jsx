import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';

const Confirm = () => {
  const [alert, setAlert] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clienteAxios(`/users/confirm/${token}`);

        setAlert({ msg: data.msg });
        setConfirmed(true);
      } catch (error) {
        setAlert({
          error: true,
          msg: error.response.data.msg
            ? error.response.data.msg
            : error.response.data.errors[0].msg,
        });
      }
    };

    return () => confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-indigo-500 font-black text-3xl">
        Confirm <span className="text-slate-700">Account</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg p-5 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmed && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default Confirm;
