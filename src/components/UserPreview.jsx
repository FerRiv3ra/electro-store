import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useDashboard from '../hooks/useDashboard';

const UserPreview = ({ user }) => {
  const { uid, name, email, img, role } = user;

  const { deleteUser } = useDashboard();
  const { auth } = useAuth();

  const handleDelete = async () => {
    const resp = confirm('Are you sure, do you want to delete this user?');

    if (!resp) return;

    const data = await deleteUser(uid);

    if (data.uid) {
      alert(`${data.name} deleted`);
    }
  };

  return (
    <div className="border-b p-2 flex">
      <img
        className="w-14 mr-3"
        src={
          img
            ? img
            : 'https://res.cloudinary.com/fercloudinary/image/upload/v1655398580/no-image_rek85p.jpg'
        }
      />
      <p className="flex-1 text-sm font-bold my-auto">
        {name}{' '}
        <span className="text-xs text-green-500 uppercase">({email})</span>
        {role === 'ADMIN_ROLE' && (
          <span className="text-xs text-white bg-red-500 rounded-xl uppercase p-1 ml-2">
            Admin
          </span>
        )}
      </p>
      <div className="flex gap-3 justify-around">
        {auth.uid === user.uid && (
          <Link
            to={`${uid}`}
            className="text-gray-600 hover:text-yellow-500 uppercase text-xs font-medium text-center my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 m-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </Link>
        )}
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-600 uppercase text-xs font-medium text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 m-auto bg-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserPreview;
