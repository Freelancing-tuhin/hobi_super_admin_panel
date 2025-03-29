import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Chart from 'react-apexcharts';
import CardBox from 'src/components/shared/CardBox';

const ServiceGraph = ({ services }: any) => {
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (services) {
      setChartSeries(
        services.map((service: any) => ({
          name: service.service_name,
          data: service.serviceStats || Array(12).fill(0),
        })),
      );
    }
  }, [services]);

  const ChartData: any = {
    series: chartSeries,
    chart: {
      toolbar: { show: false },
      type: 'area',
      height: 310,
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      width: '100%',
      stacked: false,
      offsetX: -10,
    },
    colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-error)'],
    plotOptions: {},
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 2, curve: 'monotoneCubic' },
    grid: {
      show: true,
      padding: { top: 0, bottom: 0 },
      borderColor: 'rgba(0,0,0,0.05)',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.05,
        opacityTo: 0.01,
        stops: [100],
      },
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: [
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
      ],
    },
    markers: {
      strokeColor: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-error)'],
      strokeWidth: 2,
    },
    tooltip: { theme: 'dark' },
  };

  return (
    <CardBox className="pb-0 mb-8">
      <div className="md:flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lightprimary rounded-tw">
            <Icon icon="solar:graph-up-bold" className="text-primary" height={24} />
          </span>
          <div>
            <h5 className="card-title">Service Performance</h5>
            <p className="card-subtitle">Monthly Overview</p>
          </div>
        </div>
        <div className="flex gap-5 items-center md:mt-0 mt-4">
          {services.map((service: any, index: number) => (
            <div key={index} className="flex gap-2 text-sm items-center">
              <span className={`bg-primary rounded-full h-2 w-2`}></span>
              <span className="text-ld opacity-80">{service.service_name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 -me-7 rtl:-me-7 rtl:-ms-7">
        <Chart options={ChartData} series={chartSeries} type="area" height="310px" width="100%" />
      </div>
    </CardBox>
  );
};

export default ServiceGraph;
