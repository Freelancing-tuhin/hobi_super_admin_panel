import { Icon } from '@iconify/react';
import { Badge, Dropdown } from 'flowbite-react';
import * as profileData from './Data';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { useContext } from 'react';
const Profile = () => {
  const { user, logout }: any = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clears user data from context and localStorage
    window.location.href = '/auth/auth2/login'; // Redirect to login page after logout
  };
  return (
    <div className="relative ">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] pb-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-1">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <img
                src={
                  'https://static.vecteezy.com/system/resources/previews/012/911/441/non_2x/default-avatar-profile-icon-in-line-style-vector.jpg'
                }
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        )}
      >
        <div className="px-6">
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <img
              src={
                'https://static.vecteezy.com/system/resources/previews/012/911/441/non_2x/default-avatar-profile-icon-in-line-style-vector.jpg'
              }
              alt="logo"
              height="56"
              width="56"
              className="rounded-full"
            />
            <div>
              <h5 className="text-15 -ml-5 font-semibold">Admin</h5>
              <p className="text-sm text-ld opacity-80">{user?.email}</p>
            </div>
          </div>
        </div>
        <SimpleBar>
          <div
            onClick={handleLogout}
            className="ml-6 cursor-pointer rounded-md hover:bg-red-100 hover:text-red-500 px-3 py-2 "
          >
            Logout
          </div>
        </SimpleBar>
      </Dropdown>
    </div>
  );
};

export default Profile;
