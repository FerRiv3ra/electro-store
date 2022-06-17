import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenLogin = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios('/auth/login', config);

        setAuth(data.user);
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };

    return () => tokenLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
