import { Icon } from '@iconify/react';
import { useContext } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { AuthContext } from 'src/context/authContext/AuthContext';

const Introduction = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <>
      <CardBox>
        <h5 className="card-title">Introduction</h5>
        <p className="card-subtitle">
          {' '}
          Hello, I am David McMichael. I love making websites and graphics. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Icon icon="solar:mailbox-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">{user?.email}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="solar:phone-calling-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">{user?.phone}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="solar:map-point-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">{user?.address}</p>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default Introduction;
