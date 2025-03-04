import { Label, Radio, TextInput, Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
// import { Plus, Minus } from 'tabler-icons-react';

const Pricing = ({ eventData, setEventData }: any) => {
  const handleRadioChange = (event: any) => {
    setEventData({ ...eventData, isTicketed: event.target.value === 'ticketed', tickets: [] });
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedTickets = [...eventData.tickets];
    updatedTickets[index][field] = value;
    setEventData({ ...eventData, tickets: updatedTickets });
  };

  const addTicket = () => {
    setEventData({
      ...eventData,
      tickets: [...eventData.tickets, { ticketName: '', ticketPrice: '' }],
    });
  };

  const removeTicket = (index: any) => {
    const updatedTickets = eventData.tickets.filter((_: any, i: any) => i !== index);
    setEventData({ ...eventData, tickets: updatedTickets });
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
          {eventData.tickets.map((ticket: any, index: any) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <div className="mb-2 block">
                <Label htmlFor={`ticketName-${index}`} value={`Ticket Name ${index + 1}`} />
              </div>
              <TextInput
                id={`ticketName-${index}`}
                type="text"
                name="ticketName"
                value={ticket.ticketName}
                onChange={(e) => handleInputChange(index, 'ticketName', e.target.value)}
                placeholder="Enter ticket name"
              />
              <div className="mb-2 block mt-3">
                <Label htmlFor={`ticketPrice-${index}`} value="Ticket Price" />
              </div>
              <TextInput
                id={`ticketPrice-${index}`}
                type="number"
                name="ticketPrice"
                value={ticket.ticketPrice}
                onChange={(e) => handleInputChange(index, 'ticketPrice', e.target.value)}
                placeholder="Enter ticket price"
              />
              <Button color="red" className="mt-3" onClick={() => removeTicket(index)}>
                Remove Ticket
              </Button>
            </div>
          ))}
          <Button color="primary" className="mt-3" onClick={addTicket}>
            Add Ticket
          </Button>
        </>
      )}
    </CardBox>
  );
};

export default Pricing;
