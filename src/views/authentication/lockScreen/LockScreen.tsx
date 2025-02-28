import { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';

const LockScreen = () => {
  const { user }: any = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      {/* Lock Icon and Message */}
      <div className="flex flex-col items-center bg-black/60 p-6 rounded-xl shadow-lg">
        {/* <LockKey size={80} weight="bold" className="text-white mb-4" /> */}
        <p className="text-xl font-semibold text-white">🔒</p>
        <p className="text-xl font-semibold text-white">This content is locked</p>
        <p className="text-sm text-gray-300">
          Please upload your documents to access all features.
        </p>
        <Link
          to={'/apps/user-profile/profile'}
          className="bg-blue-500 text-white py-2 px-4 mt-3 rounded cursor-pointer"
        >
          Go back to previos page
        </Link>
      </div>
    </div>
  );
};

export default LockScreen;
