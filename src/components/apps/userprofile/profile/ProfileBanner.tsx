import { TbBrandDribbble, TbBrandFacebook, TbBrandYoutube } from 'react-icons/tb';

import Banner from '/src/assets/images/backgrounds/profilebg.jpg';
import { Button } from 'flowbite-react';
import { Link } from 'react-router';
import CardBox from 'src/components/shared/CardBox';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { useContext } from 'react';

const ProfileBanner = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <>
      <CardBox className="p-0 overflow-hidden">
        <img src={Banner} alt="priofile banner" className="w-full h-32" height={30} />
        <div className="bg-white dark:bg-dark p-6 -mt-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="lg:col-span-4 col-span-12 lg:order-1 order-2">
              <div className="flex gap-6 items-center justify-around lg:py-0 py-4">
                <div className="text-center">
                  <h4 className="text-xl">⭐3.0</h4>
                  <p className="text-darklink dark:text-bodytext text-sm">Ratings</p>
                </div>
                <div className="text-center">
                  {user?.is_verified ? (
                    <h4 className="text-xl">✅verified</h4>
                  ) : (
                    <h4 className="text-xl">not verified</h4>
                  )}
                  <p className="text-darklink dark:text-bodytext text-sm">Account</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-2 order-1">
              <div className="text-center -mt-20">
                <img
                  src={user?.profile_pic}
                  alt="profile"
                  height="100"
                  width="100"
                  className="rounded-full mx-auto border-4 border-white dark:border-darkborder"
                />
                <h5 className="text-lg mt-3">{user?.full_name}</h5>
                <p className="text-darklink dark:text-bodytext">{user?.email}</p>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-3 order-3">
              <div className="flex items-center gap-3.5 lg:justify-end justify-center h-full xl:pe-4">
                <Button color={'primary'}>Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Tabs */}
      </CardBox>
    </>
  );
};

export default ProfileBanner;
