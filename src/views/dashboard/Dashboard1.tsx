import { getBasicData } from 'src/service/dashBoard';
import { useEffect, useState } from 'react';
// import { AuthContext } from 'src/context/authContext/AuthContext';
import WelcomeBox from 'src/components/dashboards/Dashboard1/WelcomeBox';
import Customer from 'src/components/dashboards/Dashboard1/Customer';
import Project from 'src/components/dashboards/Dashboard1/Project';
import RevenueForcast from 'src/components/dashboards/Dashboard1/RevenueForcast';
import NewCustomers from 'src/components/dashboards/Dashboard2/NewCustomers';
import TotalIncome from 'src/components/dashboards/Dashboard2/TotalIncome';
import FigmaCard from 'src/components/dashboards/Dashboard2/FigmaCard';
// import LockScreen from '../authentication/lockScreen/LockScreen';

const Dashboard1 = () => {
  const [basicData, setBasicData] = useState<any>();
  // const { user }: any = useContext(AuthContext);
  const getBaseData = async () => {
    try {
      const response = await getBasicData();
      setBasicData(response);
      console.log('=======>basic data', response);
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
              <Project basicData={basicData} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 col-span-12">
          <RevenueForcast basicData={basicData} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-30 mt-8">
        <div className="lg:col-span-4 col-span-12">
          <NewCustomers basicData={basicData} />
          <TotalIncome basicData={basicData} />
        </div>
        <div className="lg:col-span-4 col-span-12">
          {/* <AnnualProfit /> */}
          {/* <WeeklyStats /> */}
          <FigmaCard />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <FigmaCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard1;
