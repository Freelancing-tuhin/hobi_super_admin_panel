import { useEffect, useState } from 'react';
import CardBox from '../../shared/CardBox';
import { Icon } from '@iconify/react';
import { Progress } from 'flowbite-react';

const NewCustomers = ({ basicData }: any) => {
  // const [goalNumber, setGoalNumber] = useState(1);
  // const [currentNumber, setCurrentNumber] = useState(1);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (
      basicData?.lastMonthUniqueCustomers !== undefined &&
      basicData?.thisMonthUniqueCustomers !== undefined
    ) {
      const newGoal = (basicData.lastMonthUniqueCustomers || 1) * 3;
      const newCurrent = basicData.thisMonthUniqueCustomers || 1;
      const newPercentage = newGoal > 0 ? ((newCurrent / newGoal) * 100).toFixed(2) : 0;

      // setGoalNumber(newGoal);
      // setCurrentNumber(newCurrent);
      setPercentage(Number(newPercentage));
    }
  }, [basicData]);

  return (
    <CardBox>
      <div className="flex items-center gap-3 pb-5">
        <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lightsecondary rounded-tw">
          <Icon icon="solar:football-outline" className="text-secondary" height={24} />
        </span>
        <span className="font-medium text-base text-ld">New Customers</span>
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-ld text-15 font-medium">
          New Goal is {basicData?.lastMonthUniqueCustomers || 1 * 3}
        </span>
        <span className="text-ld text-15 font-medium">{percentage}%</span>
      </div>

      <Progress progress={percentage} color="secondary" />
    </CardBox>
  );
};

export default NewCustomers;
