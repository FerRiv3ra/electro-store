import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

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
        navigation('/');
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
