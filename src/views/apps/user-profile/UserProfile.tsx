import UserProfileApp from 'src/components/apps/userprofile/profile';
import ProfileEvents from 'src/components/apps/userprofile/profile/ProfileEvents/ProfileEvents';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'User Profile',
  },
];
const UserProfile = () => {
  return (
    <>
      <BreadcrumbComp title="User Profile" items={BCrumb} />
      <UserProfileApp />
    </>
  );
};

export default UserProfile;
