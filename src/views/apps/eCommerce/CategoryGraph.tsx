import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';
import CardBox from 'src/components/shared/CardBox';
import { Icon } from '@iconify/react';
import { MdAutoGraph } from 'react-icons/md';

interface CategoryStat {
  categoryName: string;
  eventCount: number;
  categoryStats: number[]; // Monthly data (Jan–Dec)
}

const CategoryGraphModal: React.FC = () => {
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCategoryStats = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/admin/dashboard-category`);
        setCategories(res.data.result);
      } catch (error) {
        console.error('Error fetching category stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
  }, [isOpen]);

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: categories.map((cat) => cat.categoryName),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        formatter: (val: number) => Math.floor(val).toString(),
      },
      forceNiceScale: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    colors: ['#8c5597'],
  };

  const chartSeries = [
    {
      name: 'Events',
      data: categories.map((cat) => cat.eventCount),
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 flex gap-2 items-center py-2.5 bg-green-600 text-white rounded-md hover:bg-blue-700 transitio"
      >
        <MdAutoGraph />
        Category Stats
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                leave="ease-in duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4 items-center">
                      <span className="h-12 w-12 flex items-center justify-center bg-lightprimary rounded-tw">
                        <Icon icon="solar:graph-up-bold" className="text-primary" height={24} />
                      </span>
                      <div>
                        <h5 className="text-lg font-semibold">Category Performance</h5>
                        <p className="text-sm text-gray-500">Total Overview</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <Icon icon="mdi:close" width={24} />
                    </button>
                  </div>

                  <CardBox>
                    {loading ? (
                      <div className="text-center text-gray-500 py-20">Loading chart...</div>
                    ) : (
                      // @ts-nocheck @ts-ignore @ts-expect-error @ts-ignore
                      <Chart options={chartOptions} series={chartSeries} type="area" height={300} />
                    )}
                  </CardBox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CategoryGraphModal;
