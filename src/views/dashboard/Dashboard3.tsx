import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CalendarApp from 'src/components/apps/calendar';
import CustomerChart from 'src/components/dashboards/Dashboard1/CustomerChart';
import RevenueByProduct from 'src/components/dashboards/Dashboard1/RevenueByProduct';
import SalesOverview from 'src/components/dashboards/Dashboard1/SalesOverview';
import TotalSettelment from 'src/components/dashboards/Dashboard1/TotalSettelment';
import YourPerformance from 'src/components/dashboards/Dashboard1/YourPerformance';
import AnnualProfit from 'src/components/dashboards/Dashboard2/AnnualProfit';
import RevenueForcastChart from 'src/components/dashboards/Dashboard2/RevenueForcastChart';
import ColorBoxes from 'src/components/dashboards/dashboard3/ColorBoxes';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import getBookingStatistics, {
  getBookingPerformance,
  getBookingUsers,
} from 'src/service/getEventStats';

const Dashboard3 = () => {
  const { id } = useParams<{ id: string }>(); // Get eventId from URL
  const [stats, setStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<any>(null);
  const [performance, setPerformence] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await getBookingStatistics(id);
      setStats(response);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await getBookingUsers(id);
      console.log('=>users', response?.result);
      setUsersList(response?.result);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const BookingPerformance = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await getBookingPerformance(id);
      console.log('=>performance', response);
      setPerformence(response);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [id]);

  useEffect(() => {
    BookingPerformance();
  }, [id]);
  useEffect(() => {
    fetchUsers();
  }, [id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Event list',
    },
    {
      title: 'Event stats',
    },
  ];
  return (
    <>
      <BreadcrumbComp title="Event Stats" items={BCrumb} />
      <div className="grid grid-cols-12 gap-30">
        <div className="col-span-12">
          <ColorBoxes stats={stats} />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <RevenueByProduct usersList={usersList} />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <SalesOverview />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <CustomerChart />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <YourPerformance performence={performance} />
        </div>

        {/* <div className="lg:col-span-8 col-span-12">
          <RevenueByProduct />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <TotalSettelment />
        </div>
        <div className="col-span-12">
          <CalendarApp />
        </div> */}
      </div>
    </>
  );
};

export default Dashboard3;
