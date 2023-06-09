import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useDashboard from '../hooks/useDashboard';

const FiltersSidebar = () => {
  const [elemets, setElemets] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [name, setName] = useState('');

  const { search } = useLocation();
  const navigation = useNavigate();

  const page = Number(search.slice(5)) || 1;

  const { auth } = useAuth();
  const { categories, filterProducts, getAllProducts } = useDashboard();

  useEffect(() => {
    handleSubmit();
  }, [page]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const filters = {
      elemets,
      category,
      price,
      priceFrom,
      priceTo,
      name,
      page,
    };
    filterProducts(filters);
  };

  const handleClear = () => {
    setElemets('');
    setCategory('');
    setPrice('');
    setPriceFrom('');
    setPriceTo('');
    setName('');

    getAllProducts();
    navigation({ search: '?pag=1' });
  };

  return (
    <aside className="md:w-52 lg:w-64 px-5 py-10">
      <p className="text-sm font-bold mb-3">
        Hello: {auth ? auth.name : 'Guess'}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="elements"
          >
            Items per page
          </label>
          <select
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="elements"
            value={elemets}
            onChange={(e) => setElemets(e.target.value)}
          >
            <option value="">All</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">50</option>
          </select>
        </div>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-Select Category-</option>
            {categories.map((cat) => (
              <option value={cat.uid} key={cat.uid}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="price"
          >
            Price
          </label>
          <br />
          <label className="text-xs mr-2">Low to High</label>
          <input
            type="radio"
            id="price"
            checked={price === 'asc' ? true : false}
            value="asc"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="p-3"
          />
          <br />
          <label className="text-xs mr-2">High to Low</label>
          <input
            type="radio"
            id="price"
            checked={price === 'desc' ? true : false}
            value="desc"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            className="p-3"
          />
        </div>
        <div>
          <input
            type="number"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="price-from"
            placeholder="Price from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="price-to"
            placeholder="Price to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
        <div>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="name"
          >
            Name
          </label>
          <br />
          <div className="flex justify-around">
            <div>
              <label className="text-xs mr-2">A - Z</label>
              <input
                type="radio"
                id="name-asc"
                name="name"
                checked={name === 'asc' ? true : false}
                value="asc"
                onChange={(e) => setName(e.target.value)}
                className="p-3"
              />
            </div>
            <div>
              <label className="text-xs mr-2">Z - A</label>
              <input
                type="radio"
                id="name-desc"
                name="name"
                checked={name === 'desc' ? true : false}
                value="desc"
                onChange={(e) => setName(e.target.value)}
                className="p-3"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Apply"
          className="bg-indigo-500 py-2 mt-5 w-full uppercase font-bold text-white rounded cursor-pointer hover:bg-indigo-600 transition-colors"
        />
        <button
          onClick={handleClear}
          className="bg-slate-500 py-2 mt-5 w-full uppercase font-bold text-white rounded cursor-pointer hover:bg-slate-600 transition-colors"
        >
          Clear filters
        </button>
      </form>
    </aside>
  );
};

export default FiltersSidebar;
