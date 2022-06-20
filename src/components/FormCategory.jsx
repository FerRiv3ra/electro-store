import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard';
import Alert from './Alert';

const FormCategory = () => {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { showAlert, addCategory, alert } = useDashboard();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '') {
      showAlert({
        msg: 'Category name is required',
        error: true,
      });
      return;
    }

    const data = await addCategory(name);

    if (data.code) {
      showAlert({
        msg: data.response.data.msg
          ? data.response.data.msg
          : data.response.data.errors[0].msg,
        error: true,
      });
      return;
    }

    showAlert({ msg: `${name} added` });

    setName('');

    setTimeout(() => {
      navigate('/dashboard');
    }, 3600);
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
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
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Add Category"
        className="bg-indigo-500 py-2 mt-5 w-full uppercase font-bold text-white rounded cursor-pointer hover:bg-indigo-600 transition-colors"
      />
    </form>
  );
};

export default FormCategory;
