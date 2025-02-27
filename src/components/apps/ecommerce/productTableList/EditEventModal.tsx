import { Modal, Button, TextInput, Label, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { editEvent } from 'src/service/editEvent';

const EditEventModal = ({ open, onClose, eventData, onSave, getEvents }: any) => {
  const [editedEvent, setEditedEvent] = useState(eventData);
  const [step, setStep] = useState(1);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setEditedEvent({ ...editedEvent, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async () => {
    // onSave(editedEvent);
    try {
      const updatedData = editedEvent;
      const eventId = eventData?._id;
      const result = await editEvent(eventId, updatedData);
      getEvents();
      onClose();
    } catch (error) {}
  };

  useEffect(() => {
    setEditedEvent(eventData);
  }, [eventData]);

  return (
    <Modal show={open} onClose={onClose} title="Edit Event" size="xl" dismissible>
      <div className="p-6 space-y-4">
        <div className="">
          <div className="text-2xl font-semibold text-gray-800">Edit Event</div>
          <div className="text-sm text-gray-600 mb-4 mt-2">Edit details of the selected event</div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        {/* <div className="flex justify-between text-sm text-gray-600">
          <span>Step 1</span>
          <span>Step 2</span>
          <span>Step 3</span>
        </div> */}

        {step === 1 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" value="Event Title" />
              <TextInput
                id="title"
                name="title"
                value={editedEvent?.title || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="category" value="Category" />
              <TextInput
                id="category"
                name="category"
                value={editedEvent?.category || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="type" value="Type" />
              <TextInput
                id="type"
                name="type"
                value={editedEvent?.type || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate" value="Start Date" />
              <TextInput
                id="startDate"
                name="startDate"
                type="date"
                value={editedEvent?.startDate || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="startTime" value="Start Time" />
              <TextInput
                id="startTime"
                name="startTime"
                type="time"
                value={editedEvent?.startTime || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="endTime" value="End Time" />
              <TextInput
                id="endTime"
                name="endTime"
                type="time"
                value={editedEvent?.endTime || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="location" value="Location" />
              <TextInput
                id="location"
                name="location"
                value={editedEvent?.location?.address || ''}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label htmlFor="description" value="Description" />
              <TextInput
                id="description"
                name="description"
                value={editedEvent?.description || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <Checkbox
                id="isTicketed"
                name="isTicketed"
                checked={editedEvent?.isTicketed || false}
                onChange={handleChange}
              />
              <Label htmlFor="isTicketed" value="Is Ticketed" />
            </div>
            {editedEvent?.isTicketed && (
              <>
                <div>
                  <Label htmlFor="ticketName" value="Ticket Name" />
                  <TextInput
                    id="ticketName"
                    name="ticketName"
                    value={editedEvent?.ticketName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="ticketPrice" value="Ticket Price ($)" />
                  <TextInput
                    id="ticketPrice"
                    name="ticketPrice"
                    type="number"
                    value={editedEvent?.ticketPrice || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <Modal.Footer className="flex justify-between">
        {step > 1 && (
          <Button color="light" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button color="success" onClick={() => setStep(step + 1)}>
            Next
          </Button>
        ) : (
          <Button color="success" onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
