import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import useDashboard from '../hooks/useDashboard';

const Product = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const {
    products,
    handleTotal,
    setShopping_cart,
    shopping_cart,
    showAlert,
    alert,
  } = useDashboard();

  useEffect(() => {
    setProduct(products.filter((prod) => prod.uid === id)[0]);
  }, []);

  const handleChange = (type) => {
    if (type === 'add') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
    const item = {
      id: product.uid,
      quantity,
      price: product.price,
    };

    handleTotal(product.price * quantity);
    const exist = shopping_cart.filter((item) => item.id === product.uid)[0];

    if (exist) {
      setShopping_cart(
        shopping_cart.map((el) => {
          if (el.id === item.id) {
            el.quantity += quantity;
          }
          return el;
        })
      );
    } else {
      setShopping_cart([...shopping_cart, item]);
    }
    showAlert({ msg: 'Added' });
  };

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between bg-white p-10">
        <img
          className="w-96 mr-3 flex-1 align-middle self-center"
          src={
            product.img
              ? product.img
              : 'https://res.cloudinary.com/fercloudinary/image/upload/v1655398580/no-image_rek85p.jpg'
          }
        />
        <div className="flex-1 ml-10">
          <p className="text-lg font-bold text-indigo-500">{product.name}</p>
          <p>{product.brand}</p>
          <p className="text-xl font-bold my-3">${product.price}</p>
          <p className="text-xs font-light text-slate-500">
            {product.description}
          </p>
          <p className="text-sm font-bold my-3">Stock: {product.stock}</p>
          <div className="flex justify-between gap-5 mt-10">
            <div className="flex justify-center w-1/5">
              <button
                onClick={() => handleChange()}
                disabled={quantity <= 1 ? true : false}
              >
                <svg
                  className="fill-current text-gray-600 w-3 mb-20"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </button>

              <input
                className="mx-2 mt-1 mb-20 border text-center w-8"
                type="text"
                readOnly={true}
                value={quantity}
              />

              <button
                disabled={product.stock === quantity}
                onClick={() => handleChange('add')}
              >
                <svg
                  className="fill-current text-gray-600 w-3 mb-20"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </button>
            </div>
            <button
              disabled={!product.avalible}
              className={`p-2 ${
                product.avalible ? 'bg-indigo-500' : 'bg-gray-400'
              } text-white text-xs text-center block w-full mt-2 mb-20 rounded-sm`}
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          </div>
          {msg && <Alert alert={alert} />}
        </div>
      </div>
    </>
  );
};

export default Product;
