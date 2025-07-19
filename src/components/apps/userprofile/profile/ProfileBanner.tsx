// import { updateOrganizerProfile } from 'src/service/auth';
import Banner from '/src/assets/images/backgrounds/profilebg.jpg';
import CardBox from 'src/components/shared/CardBox';
import { useEffect } from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const ProfileBanner = ({ user }: any) => {
  // const handleSubmit = async (img: any, user_id: any) => {
  //   try {
  //     await updateOrganizerProfile(id, {
  //       profile_pic: img,
  //     });
  //     console.log('======>updated for ', id);
  //     fetchOrganizer();
  //   } catch (error) {
  //     console.error('Error updating profile picture:', error);
  //     alert('Failed to update profile picture.');
  //   }
  // };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // const openCloudinaryWidget = () => {
  //   console.log('======>updated for ', id);
  //   const widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: 'diecfwnp9',
  //       uploadPreset: 'jo9pp2yd',
  //       sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
  //       folder: 'campus_highlights',
  //       cropping: false,
  //       multiple: false,
  //       maxFileSize: 1500000,
  //     },
  //     (error: any, result: any) => {
  //       if (!error && result?.event === 'success') {
  //         handleSubmit(result.info.secure_url, id);
  //       }
  //     },
  //   );
  //   widget.open();
  // };

  return (
    <>
      <CardBox className="p-0 overflow-hidden">
        <img src={Banner} alt="profile banner" className="w-full h-32 object-cover" />
        <div className="bg-white dark:bg-dark p-6 -mt-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="lg:col-span-4 col-span-12 lg:order-1 order-2"></div>

            <div className="lg:col-span-4 col-span-12 lg:order-2 order-1">
              <div className="relative text-center -mt-20 w-fit mx-auto">
                <img
                  src={user?.profile_pic}
                  alt="profile"
                  className="rounded-full w-28 h-28 mx-auto border-4 border-white dark:border-darkborder"
                />

                {/* 🖊️ Edit Icon */}
                {/* <button
                  onClick={openCloudinaryWidget}
                  className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition"
                  title="Edit profile picture"
                >
                  <Icon icon="mdi:pencil" className="text-gray-700" height={16} />
                </button> */}
              </div>
              <h5 className="text-lg mt-3 text-center">{user?.full_name}</h5>
              <p className="text-darklink dark:text-bodytext text-center">{user?.email}</p>
            </div>

            <div className="lg:col-span-4 col-span-12 lg:order-3 order-3"></div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default ProfileBanner;
