import CardBox from '../../shared/CardBox';
import Chart from 'react-apexcharts';

const Project = ({ basicData }: any) => {
  // Define original month labels
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Filter out zero values and keep corresponding month labels
  const filteredData: any = [];
  const filteredLabels: any = [];

  basicData?.eventsByMonth?.forEach((value: number, index: number) => {
    if (value !== 0) {
      filteredData.push(value);
      filteredLabels.push(monthLabels[index]); // Keep the correct month name
    }
  });

  const ChartData: any = {
    series: [
      {
        name: 'Events',
        data: filteredData,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      height: 55,
      type: 'bar',
      offsetX: -3,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['#fff'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'flat',
        borderRadius: 4,
      },
    },
    tooltip: {
      theme: 'dark',
      followCursor: true,
    },
    xaxis: {
      categories: filteredLabels, // ✅ Proper labels are set here
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
  };

  return (
    <div>
      <CardBox className="shadow-none p-0 overflow-hidden">
        <div className="bg-lighterror p-6 ">
          <p className="text-ld">Total Events</p>
          <div className="flex gap-3 align-self mb-4 pb-2">
            <h5 className="text-2xl">{basicData?.totalEvents}</h5>
            <span className="text-13 text-ld font-semibold pt-1">+31.8%</span>
          </div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="bar"
            height="55px"
            width="100%"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default Project;
