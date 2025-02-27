import { Icon } from '@iconify/react/dist/iconify.js';
import { format } from 'date-fns';
import { Badge, Checkbox, Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SimpleBar from 'simplebar-react';
import { getEvent } from 'src/service/getEvents';
import EditEventModal from './EditEventModal';
import { deleteEvent } from 'src/service/deleteEvent';

const EventTable = ({
  selectAll,
  toggleSelectAll,
  selectedProducts,
  toggleSelectProduct,
  HiOutlineDotsVertical,
}: any) => {
  const [events, setEvents] = useState([]);
  const [editedevents, setEditedevents] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedevents(data);
  };

  const getEvents = async () => {
    try {
      const response = await getEvent({
        filter: { organizerId: '67b1e4a127162a76e667d1b6' },
      });
      setEvents(response.result || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (eventId: any) => {
    try {
      const result = await deleteEvent(eventId);
      console.log('Event deleted:', result);
      getEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <SimpleBar className="max-h-[580px]">
        <div className="border rounded-md border-ld overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell className="text-base font-semibold py-3">Events</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Date</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Ticket Name</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Status</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Price</Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {events.map((item: any) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.banner_Image}
                        alt="Event Banner"
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded"
                      />
                      <div>
                        <h6 className="text-base">{item.title}</h6>
                        <p className="text-sm text-darklink dark:text-bodytext">{item.category}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm text-darklink dark:text-bodytext font-medium">
                      {format(new Date(item.startDate), 'E, MMM d yyyy')}
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                      <Icon icon="solar:card-2-bold" height={22} />
                      {item?.ticketName}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                      {item?.verified ? (
                        <>
                          <Icon
                            icon="solar:check-circle-bold-duotone"
                            className="text-green-500"
                            height={22}
                          />
                          <div className="">Verified</div>
                        </>
                      ) : (
                        <>
                          <Icon
                            icon="solar:clock-circle-bold-duotone"
                            className="text-yellow-300"
                            height={22}
                          />
                          <div className="">Pending</div>
                        </>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <h5 className="text-base">₹{item?.ticketPrice}</h5>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <HiOutlineDotsVertical size={22} />
                        </span>
                      )}
                    >
                      <Dropdown.Item>
                        <Link to={`/Event/${item._id}`} className="flex gap-">
                          <Icon icon="solar:diagram-down-bold" height={18} />
                          <span>View stats</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          OpenModal(item);
                        }}
                      >
                        <Icon icon="solar:pen-new-square-broken" height={18} />
                        <span>Edit</span>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteEvent(item._id)}>
                        <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                        <span>Delete</span>
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
      <EditEventModal
        eventData={editedevents}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        getEvents={getEvents}
      />
    </>
  );
};

export default EventTable;
