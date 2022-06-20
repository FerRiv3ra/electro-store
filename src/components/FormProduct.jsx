import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import Alert from './Alert';

const FormProduct = ({ product }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [img, setImg] = useState('');
  const [imgName, setImgName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const { categories, alert, showAlert, addProduct, editProduct } =
    useDashboard();

  useEffect(() => {
    if (id) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category?._id);
      setDescription(product.description);
      setStock(product.stock);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, price, brand, category, description, stock].includes('')) {
      showAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }

    if (
      !imgName &&
      name === product.name &&
      price === product.price &&
      brand === product.brand &&
      category === product.category._id &&
      description === product.description &&
      stock === product.stock
    ) {
      showAlert({
        msg: 'Nothing to do',
      });

      setName('');
      setBrand('');
      setCategory('');
      setDescription('');
      setPrice('');
      setStock('');
      setImg('');
      setImgName('');

      setTimeout(() => {
        navigate('/dashboard');
      }, 3600);
      return;
    }

    const file = new FormData();
    file.append('file', img);

    let data;
    if (id) {
      data = await editProduct(id, {
        name,
        price,
        brand,
        category,
        description,
        stock,
        file,
        imgName,
      });
    } else {
      data = await addProduct({
        name,
        price,
        brand,
        category,
        description,
        stock,
        file,
        imgName,
      });
    }

    if (data.code) {
      showAlert({
        msg: data.response.data.msg
          ? data.response.data.msg
          : data.response.data.errors[0].msg,
        error: true,
      });
      return;
    }

    showAlert({
      msg: `${id ? 'Success: product updated' : `${name} added`}`,
    });

    setName('');
    setBrand('');
    setCategory('');
    setDescription('');
    setPrice('');
    setStock('');
    setImg('');
    setImgName('');

    setTimeout(() => {
      navigate('/dashboard');
    }, 3600);
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-2/3 rounded-lg"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="name"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="price"
        >
          Price
        </label>
        <input
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="price"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="brand"
        >
          Brand
        </label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="brand"
          placeholder="Product Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div className="my-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="image"
        >
          Image
        </label>
        <input
          id="image"
          type="file"
          className="border w-full p-2 mt-1 placeholder-gray-400 rounded-md"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          value={imgName}
          onChange={(e) => {
            setImg(e.target.files[0]);
            setImgName(e.target.value);
          }}
        />
        {product && product.img && (
          <p className=" text-xs">
            *There is an image stored, if you want to change it, upload another
            one
          </p>
        )}
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
          id="name"
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
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="description"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="stock"
        >
          Stock
        </label>
        <input
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="stock"
          placeholder="Product Start Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? 'Save Changes' : 'Add product'}
        className="bg-indigo-500 py-2 mt-5 w-full uppercase font-bold text-white rounded cursor-pointer hover:bg-indigo-600 transition-colors"
      />
    </form>
  );
};

export default FormProduct;
