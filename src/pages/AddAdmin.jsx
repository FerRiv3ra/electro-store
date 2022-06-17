import FormUser from '../components/FormUser';

const AddAdmin = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Add New Admin</h1>
      <div className="mt-10 flex justify-center">
        <FormUser />
      </div>
    </>
  );
};

export default AddAdmin;
