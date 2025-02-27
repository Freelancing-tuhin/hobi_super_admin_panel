import CardBox from '../../shared/CardBox';
import Chart from 'react-apexcharts';
// const ChartData: any = {
//   chart: {
//     id: "annual-profit",
//     type: "area",
//     height: 80,
//     sparkline: {
//       enabled: true,
//     },
//     group: "sparklines",
//     fontFamily: "inherit",
//     foreColor: "#adb0bb",
//   },
//   series: [
//     {
//       name: "Users",
//       color: "var(--color-primary)",
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ],
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   fill: {
//     type: "gradient",
//     color: "var(--color-primary)",

//     gradient: {
//       shadeIntensity: 0,
//       inverseColors: false,
//       opacityFrom: 0.1,
//       opacityTo: 0.8,
//       stops: [100],
//     },
//   },

//   markers: {
//     size: 0,
//   },
//   tooltip: {
//     theme: "dark",
//     fixed: {
//       enabled: true,
//       position: "right",
//     },
//     x: {
//       show: false,
//     },
//   },
// };

const ChartData: any = {
  series: [
    {
      name: 'Users',
      color: 'var(--color-primary)',
      data: [25, 78, 15, 50, 8, 78, 20],
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

const AnnualProfit = () => {
  return (
    <>
      <CardBox>
        <div>
          <h5 className="card-title">Annual Profit</h5>
          <div className="bg-lightprimary mt-4 overflow-hidden rounded-md mb-1">
            <div className="py-30 px-6 flex justify-between items-center ">
              <p className="text-ld">Conversion Rate</p>
              <h4 className="text-28">18.4%</h4>
            </div>
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="area"
              height="80px"
              width="100%"
              className="mt-4"
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="font-medium text-ld opacity-80">Added to Cart</span>
              <p className="text-13">5 clicks</p>
            </div>
            <div className="text-end">
              <h6 className="text-15 font-bold">$21,120.70</h6>
              <span className="text-13 text-success font-medium">+13.2%</span>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default AnnualProfit;
