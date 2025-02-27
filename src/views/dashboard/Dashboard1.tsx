import { getBasicData } from 'src/service/dashBoard';
import Customer from '../../components/dashboards/Dashboard1/Customer';
import Project from '../../components/dashboards/Dashboard1/Project';
import RevenueForcast from '../../components/dashboards/Dashboard1/RevenueForcast';
import WelcomeBox from '../../components/dashboards/Dashboard1/WelcomeBox';
import { useEffect, useState } from 'react';

const Dashboard1 = () => {
  const [basicData, setBasicData] = useState<any>();

  const getBaseData = async () => {
    try {
      const organizerId = '67b1e4a127162a76e667d1b6';
      const response = await getBasicData(organizerId);
      setBasicData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getBaseData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-30">
        <div className="lg:col-span-5 col-span-12">
          <WelcomeBox basicData={basicData} />
          <div className="grid grid-cols-12 mt-30 gap-30">
            <div className="md:col-span-6 col-span-12">
              <Customer basicData={basicData} />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Project />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 col-span-12">
          <RevenueForcast />
        </div>
      </div>
    </>
  );
};

export default Dashboard1;
