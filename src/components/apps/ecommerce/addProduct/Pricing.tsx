import { Label, Radio, TextInput } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

const Pricing = ({ eventData, setEventData }: any) => {
  const handleRadioChange = (event: { target: { value: string } }) => {
    setEventData({ ...eventData, isTicketed: event.target.value === 'ticketed' });
  };

  const handleInputChange = (event: { target: { name: string; value: any } }) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Pricing</h5>

      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="isTicketed" value="Activity Type" />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="border border-ld p-4 rounded-xl hover:border-primary hover:bg-lightprimary cursor-pointer">
              <div className="flex items-center gap-4 sm:ps-2">
                <Radio
                  id="free-activity"
                  name="isTicketed"
                  value="free"
                  className="cursor-pointer"
                  checked={!eventData.isTicketed}
                  onChange={handleRadioChange}
                />
                <Label
                  htmlFor="free-activity"
                  className="cursor-pointer text-ld font-semibold text-base"
                >
                  Free Activity
                </Label>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="border border-ld p-4 rounded-xl hover:border-primary hover:bg-lightprimary cursor-pointer">
              <div className="flex items-center gap-4 sm:ps-2">
                <Radio
                  id="ticketed-activity"
                  name="isTicketed"
                  value="ticketed"
                  className="cursor-pointer"
                  checked={eventData.isTicketed}
                  onChange={handleRadioChange}
                />
                <Label
                  htmlFor="ticketed-activity"
                  className="cursor-pointer text-ld font-semibold text-base"
                >
                  Ticketed Activity
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {eventData.isTicketed && (
        <>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="ticketName" value="Ticket Name" />
            </div>
            <TextInput
              id="ticketName"
              type="text"
              name="ticketName"
              value={eventData.ticketName}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter ticket name"
            />
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="ticketPrice" value="Ticket Price" />
            </div>
            <TextInput
              id="ticketPrice"
              type="number"
              name="ticketPrice"
              value={eventData.ticketPrice}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter ticket price"
            />
          </div>
        </>
      )}
    </CardBox>
  );
};

export default Pricing;
