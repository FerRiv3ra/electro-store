import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { products } = useDashboard();

  useEffect(() => {
    setProduct(products.filter((prod) => prod.uid === id)[0]);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black">{product.name}</h1>
    </div>
  );
};

export default Product;
