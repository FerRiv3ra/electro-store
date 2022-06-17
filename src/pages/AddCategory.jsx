import FormCategory from '../components/FormCategory';

const AddCategory = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Add New Category</h1>
      <div className="mt-10 flex justify-center">
        <FormCategory />
      </div>
    </>
  );
};

export default AddCategory;
