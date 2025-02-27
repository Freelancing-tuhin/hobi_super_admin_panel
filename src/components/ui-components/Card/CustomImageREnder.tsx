import { Card } from "flowbite-react";

import CardBox from "src/components/shared/CardBox";
import CodeModal from "../CodeModal";
import user2 from "/src/assets/images/profile/user-2.jpg"


const CustomImageREnder = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Image Render Function</h4>
          <CodeModal>
            {`
    import { Card } from "flowbite-react";
      
    <Card
          renderImage={() => (
            <Image
              width={500}
              height={500}
              src={user2}
              alt="image 1"
            />
          )}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white pt-4">
            Noteworthy technology acquisitions
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2024 so
            far, in reverse chronological order.
          </p>
    </Card> 
                `}
          </CodeModal>
        </div>

        <Card
          renderImage={() => (
            <img
              width={500}
              height={500}
              src={user2}
              alt="image 1"
            />
          )}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white pt-4">
            Noteworthy technology acquisitions
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2024 so
            far, in reverse chronological order.
          </p>
        </Card>
      </CardBox>
    </div>
  );
};

export default CustomImageREnder;
