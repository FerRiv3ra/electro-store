import { useEffect } from 'react';
import ProductPreview from '../components/ProductPreview';
import useDashboard from '../hooks/useDashboard';

const Products = () => {
  const { products, setSearch, search } = useDashboard();
  useEffect(() => {
    setSearch('');
  }, []);

  const productArr = products.filter((prod) =>
    prod.name.includes(search.toUpperCase())
  );

  return (
    <>
      <h1 className="text-4xl font-black">Products</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {productArr.length ? (
          productArr.map((product) => (
            <ProductPreview key={product.uid} product={product} />
          ))
        ) : (
          <p className="text-center text-slate-700 uppercase p-4">
            Nothing to show
          </p>
        )}
      </div>
    </>
  );
};

export default Products;
