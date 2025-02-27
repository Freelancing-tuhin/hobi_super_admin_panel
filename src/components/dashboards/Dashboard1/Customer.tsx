import CardBox from '../../shared/CardBox';
import Chart from 'react-apexcharts';

const ChartData: any = {
  series: [
    {
      name: 'customers',
      data: [36, 45, 31, 47, 38, 43],
      color: 'var(--color-secondary)',
    },
  ],

  chart: {
    type: 'area',
    height: 70,
    sparkline: {
      enabled: true,
    },
    group: 'sparklines',
    fontFamily: 'inherit',
    foreColor: '#adb0bb',
  },
  color: 'var(--color-secondary)',
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    color: 'var(--color-secondary)',
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0.2,
      opacityTo: 0.8,
      stops: [100],
    },
  },
  markers: {
    size: 0,
  },
  tooltip: {
    theme: 'dark',
    fixed: {
      enabled: true,
      position: 'right',
    },
    x: {
      show: false,
    },
  },
};

const Customer = ({ basicData }: any) => {
  const calculatePercentageChange = (current: any, previous: any) => {
    if (previous === 0) {
      return current > 0 ? '+100%' : '0%'; // If last month was 0, any increase is 100%
    }
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
  };

  const percentageText = calculatePercentageChange(
    basicData?.thisMonthUniqueUsers || 0,
    basicData?.lastMonthUniqueUsers || 0,
  );

  const percentageColor = percentageText.includes('+') ? 'text-green-500' : 'text-red-500';

  return (
    <div>
      <CardBox className="shadow-none p-0 overflow-hidden">
        <div className="bg-lightsecondary  ">
          <div className="p-6">
            <p className="text-ld">Customers</p>
            <div className="flex gap-3 align-self">
              <h5 className="text-2xl">0{basicData?.uniqueUsers}</h5>
              <span className={percentageColor}> ({percentageText})</span>
            </div>
          </div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="70px"
            width="100%"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default Customer;
