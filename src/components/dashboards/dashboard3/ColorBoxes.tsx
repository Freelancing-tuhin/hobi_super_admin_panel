import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import CardBox from 'src/components/shared/CardBox';

const ColorBoxes = ({ stats }: any) => {
  const ColorboxData = [
    {
      bg: 'secondary-gradient',
      icon: 'ic:outline-backpack',
      color: 'bg-secondary',
      title: 'Total Bookings',
      price: stats?.totalBookings,
      link: '#',
    },
    {
      bg: 'warning-gradient',
      icon: 'solar:recive-twice-square-linear',
      color: 'bg-warning',
      title: 'Booking This Week',
      price: stats?.bookingsThisWeek,
      link: '#',
    },
    {
      bg: 'primary-gradient',
      icon: 'solar:dollar-minimalistic-linear',
      color: 'bg-primary',
      title: 'Todays Bookings',
      price: stats?.bookingsToday,
      link: '#',
    },
    {
      bg: 'error-gradient',
      icon: 'ic:baseline-sync-problem',
      color: 'bg-error',
      title: 'Total Income',
      price: '₹' + stats?.totalIncome,
      link: '#',
    },
    {
      bg: 'success-gradient',
      icon: 'ic:outline-forest',
      color: 'bg-success',
      title: 'Todays Income ',
      price: '₹' + stats?.todaysIncome,
      link: '#',
    },
  ];

  return (
    <>
      <CardBox className="">
        <SimpleBar className="h-48">
          <div className="flex  gap-30">
            {ColorboxData.map((item, index) => (
              <div className="lg:basis-1/5 md:basis-1/4 basis-full lg:shrink shrink-0" key={index}>
                <div className={`text-center px-5 py-30 rounded-tw ${item.bg}`}>
                  <span
                    className={`h-12 w-12 mx-auto flex items-center justify-center  rounded-tw ${item.color}`}
                  >
                    <Icon icon={item.icon} className="text-white" height={24} />
                  </span>
                  <p className="text-ld font-normal mt-4 mb-2">{item.title}</p>
                  <h4 className="text-22">{item.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </CardBox>
    </>
  );
};

export default ColorBoxes;
