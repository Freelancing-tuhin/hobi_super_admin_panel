import RevenueByProduct from 'src/components/dashboards/Dashboard1/RevenueByProduct';
import AnnualProfit from 'src/components/dashboards/Dashboard2/AnnualProfit';
import DailyActivities from 'src/components/dashboards/Dashboard2/DailyActivivities';
import FigmaCard from 'src/components/dashboards/Dashboard2/FigmaCard';
import GradientBox from 'src/components/dashboards/Dashboard2/GradientBox';
import NewCustomers from 'src/components/dashboards/Dashboard2/NewCustomers';
import RevenueForcastChart from 'src/components/dashboards/Dashboard2/RevenueForcastChart';
import SalesFromLocation from 'src/components/dashboards/Dashboard2/SalesFromLocation';
import Subscriptions from 'src/components/dashboards/Dashboard2/Subscriptions';
import TotalIncome from 'src/components/dashboards/Dashboard2/TotalIncome';
import UsersBox from 'src/components/dashboards/Dashboard2/UsersBox';
import WeeklySchedule from 'src/components/dashboards/Dashboard2/WeeklySchedule';
import WeeklyStats from 'src/components/dashboards/Dashboard2/WeeklyStats';

const Dashboard2 = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-30 mt-8">
        <div className="lg:col-span-4 col-span-12">
          <NewCustomers />
          <TotalIncome />
        </div>
        <div className="lg:col-span-4 col-span-12">
          {/* <AnnualProfit /> */}
          <WeeklyStats />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <FigmaCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
