import { Link } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';

const StorePreview = ({ product }) => {
  const { uid, name, stock, avalible, img, price } = product;

  const { setShopping_cart, shopping_cart, showAlert } = useDashboard();

  const handleAdd = () => {
    const item = {
      id: uid,
      quantity: 1,
      price,
    };

    const exist = shopping_cart.filter((el) => el.id === item.id);

    if (exist.length) {
      setShopping_cart(
        shopping_cart.map((el) => {
          if (el.id === item.id) {
            el.quantity += 1;
          }
          return el;
        })
      );
    } else {
      setShopping_cart([...shopping_cart, item]);
    }
    showAlert({ msg: `${name.slice(0, 25)} added` });
  };

  return (
    <div className="p-2 w-56 m-4">
      <Link to={`product/${uid}`}>
        <div className="h-28">
          <img
            className="w-28 mx-auto"
            src={
              img
                ? img
                : 'https://res.cloudinary.com/fercloudinary/image/upload/v1655398580/no-image_rek85p.jpg'
            }
          />
        </div>
        <p className="flex-1 text-xs font-bold text-center mt-2">{name}</p>
        <p
          className={`text-xs text-center ${
            avalible ? 'text-green-500' : 'text-red-600'
          } uppercase`}
        >
          ({avalible ? `Stock - ${stock}` : 'not available'})
        </p>
        <p
          className={`text-sm font-bold text-center text-indigo-500 uppercase`}
        >
          $ {price}
        </p>
      </Link>
      <button
        disabled={!avalible}
        className={`p-1 ${
          avalible ? 'bg-indigo-500' : 'bg-gray-400'
        } text-white text-xs text-center block w-full mt-2 rounded-sm`}
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default StorePreview;
