import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormProduct from '../components/FormProduct';
import useDashboard from '../hooks/useDashboard';

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { products } = useDashboard();

  useEffect(() => {
    setProduct(products.filter((prod) => prod.uid === id)[0]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-black mb-2">{product.name}</h1>
      <FormProduct product={product} />
    </div>
  );
};

export default EditProduct;
