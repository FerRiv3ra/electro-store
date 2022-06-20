import { useEffect } from 'react';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';
import StorePreview from '../components/StorePreview';
import useDashboard from '../hooks/useDashboard';

const Store = () => {
  const { products, setSearch, search, alert } = useDashboard();
  useEffect(() => {
    setSearch('');
  }, []);

  const productArr = products.filter((prod) =>
    prod.name.includes(search.toUpperCase())
  );

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Products</h1>
        {msg && <Alert alert={alert} />}
      </div>
      <div
        className={
          productArr.length &&
          'bg-white mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3'
        }
      >
        {productArr.length ? (
          productArr.map((product) => (
            <StorePreview key={product.uid} product={product} />
          ))
        ) : (
          <p className="text-center text-slate-700 uppercase p-4">
            Nothing to show
          </p>
        )}
      </div>
      {productArr.length ? <Pagination /> : ''}
    </>
  );
};

export default Store;
