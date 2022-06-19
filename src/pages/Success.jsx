import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import useDashboard from '../hooks/useDashboard';

const Success = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const { id } = useParams();
  const { confirmPayment } = useDashboard();

  useEffect(() => {
    setIsloading(true);
    const confirm = async () => {
      const data = await confirmPayment(id);

      if (data.error) return;

      if (data.msg) {
        setIsConfirm(true);
      }
    };

    setIsloading(false);
    return () => confirm();
  }, []);
  return (
    <div>
      {isloading ? (
        <p
          className={`block text-center uppercase text-slate-500 text-sm font-bold`}
        >
          Loading...
        </p>
      ) : (
        <div>
          <h2
            className={`block text-center uppercase ${
              isConfirm ? 'text-sky-500' : 'text-red-500'
            } text-lg font-bold`}
          >
            {isConfirm ? 'Success payment completed' : 'Invalid token'}
          </h2>
          <div className="flex justify-center">
            <Link
              to="/store"
              className="inline-block p-2 mt-3 uppercase text-white bg-sky-500 font-bold rounded-lg"
            >
              Go to store
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
