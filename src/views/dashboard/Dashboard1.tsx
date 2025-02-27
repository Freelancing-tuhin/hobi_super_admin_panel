import Customer from '../../components/dashboards/Dashboard1/Customer';
import Project from '../../components/dashboards/Dashboard1/Project';
import RevenueForcast from '../../components/dashboards/Dashboard1/RevenueForcast';
import WelcomeBox from '../../components/dashboards/Dashboard1/WelcomeBox';

const Dashboard1 = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-30">
        <div className="lg:col-span-5 col-span-12">
          <WelcomeBox />
          <div className="grid grid-cols-12 mt-30 gap-30">
            <div className="md:col-span-6 col-span-12">
              <Customer />
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
