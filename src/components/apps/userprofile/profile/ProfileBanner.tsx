import Banner from '/src/assets/images/backgrounds/profilebg.jpg';
import { Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { AuthContext } from 'src/context/authContext/AuthContext';
import { useContext } from 'react';

const ProfileBanner = ({ user }: any) => {
  // const { user }: any = useContext(AuthContext);
  return (
    <>
      <CardBox className="p-0 overflow-hidden">
        <img src={Banner} alt="priofile banner" className="w-full h-32" height={30} />
        <div className="bg-white dark:bg-dark p-6 -mt-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="lg:col-span-4 col-span-12 lg:order-1 order-2"></div>
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
            <div className="lg:col-span-4 col-span-12 lg:order-3 order-3"></div>
          </div>
        </div>
        {/* Profile Tabs */}
      </CardBox>
    </>
  );
};

export default ProfileBanner;
