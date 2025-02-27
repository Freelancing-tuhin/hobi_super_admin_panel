
import CardBox from "src/components/shared/CardBox";
import Banner from "/src/assets/images/backgrounds/gold.png";
import { Button } from "flowbite-react";
const NotificationBanner = () => {
  return (
    <>
      <CardBox>
        <p className="text-sm text-bodytext text-center mb-2">LEVEL UP</p>
        <img src={Banner} alt="banner" className="mx-auto  w-[150px]" />
        <div className="text-center mx-auto mt-3">
          <h5 className="text-lg">You reach all Notifications</h5>
          <p className="text-bodytext mt-2 md:px-12">
          Congratulations, Tap to continue next task.
          </p>
          <div className="flex justify-center mt-3">
            <Button color={"primary"}>Yes,Got it!</Button>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default NotificationBanner;
