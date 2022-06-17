import FormProduct from '../components/FormProduct';

const AddProduct = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Add New Product</h1>
      <div className="mt-10 flex justify-center">
        <FormProduct />
      </div>
    </>
  );
};

export default AddProduct;
