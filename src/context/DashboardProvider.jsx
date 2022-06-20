import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [shopping_cart, setShopping_cart] = useState([]);
  const [isConfirm, setIsConfirm] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pages, setPages] = useState(1);

  const { auth, loading: authLoading } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const [products, categories, users] = await Promise.all([
          clienteAxios('/products?name=asc'),
          clienteAxios('/categories'),
          clienteAxios('/users'),
        ]);

        setProducts(products.data.products);
        setTotalProducts(products.data.total);
        setCategories(categories.data.categories);
        setUsers(users.data.users);
      } catch (error) {
        console.log(error);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    return () => getData();
  }, []);

  useEffect(() => {
    if (!authLoading) {
      setShopping_cart(auth.shopping_cart);
    }
  }, [authLoading]);

  useEffect(() => {
    if (!loading) {
      handleCart();
      setTotal(
        shopping_cart.reduce(
          (tot, shopping_cart) =>
            tot + shopping_cart.price * shopping_cart.quantity,
          0
        )
      );
    }
  }, [shopping_cart]);

  const getAllProducts = async () => {
    try {
      const { data } = await clienteAxios('/products?name=asc');
      setProducts(data.products);
      setPages(1);
    } catch (error) {
      setProducts([]);
    }
  };

  const addProduct = async (product) => {
    const { file, imgName, ...productNew } = product;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post('/products', productNew, config);

      if (imgName) {
        const resp = await clienteAxios.put(
          `/upload/products/${data.uid}`,
          file,
          config
        );

        data.img = resp.data.img;
      }

      setProducts([...products, data]);

      return data;
    } catch (error) {
      return error;
    }
  };

  const addCategory = async (name) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post('/categories', { name }, config);

      setCategories([...categories, data]);

      return data;
    } catch (error) {
      return error;
    }
  };

  const addAdminUser = async (user) => {
    const { name, email, file, imgName, password } = user;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      user.role = 'ADMIN_ROLE';

      const { data } = await clienteAxios.post(
        '/users',
        { name, email, password },
        config
      );

      if (imgName) {
        const resp = await clienteAxios.put(
          `/upload/users/${data.uid}`,
          file,
          config
        );

        data.img = resp.data.img;
      }

      return data;
    } catch (error) {
      return error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/products/${id}`, config);

      setProducts(products.filter((prod) => prod.uid !== id));

      return data;
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/users/${id}`, config);

      setUsers(users.filter((user) => user.uid !== id));

      return data;
    } catch (error) {
      return error;
    }
  };

  const editProduct = async (id, product, handleAvalible = false) => {
    if (!product) return;
    const { file, imgName, ...productE } = product;

    if (handleAvalible) {
      productE.category = productE.category._id;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (handleAvalible) {
        productE.avalible = !productE.avalible;
      }

      const { data } = await clienteAxios.put(
        `/products/${id}`,
        productE,
        config
      );

      if (imgName) {
        const resp = await clienteAxios.put(
          `/upload/products/${data.uid}`,
          file,
          config
        );

        data.img = resp.data.img;
      }

      setProducts(
        products.map((prod) => {
          if (prod.uid === id) {
            return data;
          } else {
            return prod;
          }
        })
      );

      return data;
    } catch (error) {
      return error;
    }
  };

  const editUser = async (id, user) => {
    if (!user) return;
    const { file, imgName, password, ...userE } = user;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (password) {
        userE.password = password;
      }

      const { data } = await clienteAxios.put(`/users/${id}`, userE, config);

      if (imgName) {
        const resp = await clienteAxios.put(
          `/upload/users/${data.uid}`,
          file,
          config
        );

        data.img = resp.data.img;
      }

      setUsers(
        users.map((user) => {
          if (user.uid === id) {
            return data;
          } else {
            return user;
          }
        })
      );

      return data;
    } catch (error) {
      return error;
    }
  };

  const filterProducts = async (filters) => {
    const { elemets, category, price, priceFrom, priceTo, name, page } =
      filters;
    let url = '/products';
    let first = true;

    if (!elemets && !category && !price && !priceFrom && !priceTo && !name) {
      return;
    } else {
      url += '?';
    }

    if (elemets) {
      setPages(Math.ceil(totalProducts / elemets));
      const start = page === 1 ? 0 : (page - 1) * elemets;
      if (first) {
        url += `start=${start}&limit=${elemets}`;
        first = false;
      } else {
        url += `&start=${start}&limit=${elemets}`;
      }
    }
    if (category) {
      if (first) {
        url += `category=${category}`;
        first = false;
      } else {
        url += `&category=${category}`;
      }
    }
    if (price) {
      if (first) {
        url += `price=${price}`;
        first = false;
      } else {
        url += `&price=${price}`;
      }
    }
    if (priceFrom) {
      if (first) {
        url += `priceFrom=${priceFrom}`;
        first = false;
      } else {
        url += `&priceFrom=${priceFrom}`;
      }
    }

    if (priceTo) {
      if (first) {
        url += `priceTo=${priceTo}`;
        first = false;
      } else {
        url += `&priceTo=${priceTo}`;
      }
    }

    if (name) {
      if (first) {
        url += `name=${name}`;
        first = false;
      } else {
        url += `&name=${name}`;
      }
    }

    const { data } = await clienteAxios(url);

    setProducts(data.products);
  };

  const checkoutPayment = async () => {
    if (!shopping_cart.length) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/checkout`,
        { items: shopping_cart },
        config
      );

      window.location.href = data.url;
    } catch (error) {
      showAlert({ msg: error.response.data.error, error: true });
      return;
    }
  };

  const confirmPayment = async (id) => {
    if (isConfirm) {
      const error = new Error('Invalid token');
      return error;
    }
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const data = await clienteAxios(`/checkout/${id}`, config);

      setIsConfirm(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = async () => {
    const user = auth;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      user.shopping_cart = shopping_cart;

      const { data } = await clienteAxios.put(
        `/users/${user.uid}`,
        user,
        config
      );

      setUsers(
        users.map((user) => {
          if (user.uid === id) {
            return data;
          } else {
            return user;
          }
        })
      );

      return data;
    } catch (error) {
      return error;
    }
  };

  const handleTotal = (amount) => {
    setTotal(total + amount);
  };

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 3500);
  };

  return (
    <DashboardContext.Provider
      value={{
        products,
        categories,
        users,
        loading,
        showAlert,
        alert,
        addProduct,
        addCategory,
        addAdminUser,
        deleteProduct,
        editProduct,
        deleteUser,
        editUser,
        search,
        setSearch,
        filterProducts,
        shopping_cart,
        setShopping_cart,
        checkoutPayment,
        confirmPayment,
        isConfirm,
        handleTotal,
        total,
        handleCart,
        totalProducts,
        getAllProducts,
        pages,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider };

export default DashboardContext;
