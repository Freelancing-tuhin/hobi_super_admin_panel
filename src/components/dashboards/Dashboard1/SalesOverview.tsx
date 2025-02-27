import CardBox from '../../shared/CardBox';
import Chart from 'react-apexcharts';
const ChartData: any = {
  series: [50, 80, 30],
  labels: ['36%', '10%', '36%'],
  chart: {
    type: 'radialBar',
    height: 230,
    fontFamily: 'inherit',
    foreColor: '#c6d1e9',
  },
  plotOptions: {
    radialBar: {
      inverseOrder: false,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 1,
        size: '40%',
      },
      dataLabels: {
        show: false,
      },
    },
  },
  legend: {
    show: false,
  },
  stroke: { width: 1, lineCap: 'round' },
  tooltip: {
    enabled: false,
    fillSeriesColor: false,
  },
  colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-error)'],
};

const SalesOverview = () => {
  return (
    <>
      <CardBox>
        <div>
          <h5 className="card-title">Ticket Sales Overview</h5>
          <p className="card-subtitle">All time sales</p>
        </div>
        <div className=" relative">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="radialBar"
            height="248px"
            width="100%"
          />
          <span className="absolute text-nowrap top-0 mx-auto left-0 right-0 w-5 text-ld opacity-90 text-13">
            0%
          </span>
          <span className="absolute text-nowrap top-1/2 right-0 w-5 text-ld opacity-90 text-13">
            25%
          </span>
          <span className="absolute text-nowrap bottom-0 mx-auto left-1 right-0 w-5 text-ld opacity-90 text-13">
            50%
          </span>
          <span className="absolute text-nowrap top-1/2 2xl:left-0 -left-2  w-5 text-ld opacity-90 text-13">
            75%
          </span>
        </div>
      </CardBox>
    </>
  );
};

export default SalesOverview;
