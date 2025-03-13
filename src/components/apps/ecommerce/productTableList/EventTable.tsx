import { Icon } from '@iconify/react/dist/iconify.js';
import { format } from 'date-fns';
import { Dropdown, Table, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
// import SimpleBar from 'simplebar-react';
import { getEvent } from 'src/service/getEvents';
import EditEventModal from './EditEventModal';
import { deleteEvent } from 'src/service/deleteEvent';

const EventTable = ({ HiOutlineDotsVertical }: any) => {
  // const { user }: any = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [editedevents, setEditedevents] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedevents(data);
  };

  const getEvents = async (page = 1) => {
    // setEvents([]);
    try {
      const response = await getEvent({
        filter: { page: page, limit: 2 },
      });
      setEvents(response.result || []);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (eventId: any) => {
    try {
      await deleteEvent(eventId);
      getEvents(currentPage);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  useEffect(() => {
    getEvents(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="border rounded-md border-ld overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Events</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Ratings</Table.HeadCell>
            <Table.HeadCell>Organizer</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {events.map((item: any) => (
              <Table.Row key={item._id}>
                <Table.Cell>
                  <div className="flex gap-3 items-center">
                    <img src={item.banner_Image} alt="Event Banner" className="h-14 w-14 rounded" />
                    <div>
                      <h6 className="text-base">{item.title}</h6>
                      <p className="text-sm text-darklink dark:text-bodytext">{item.category}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{format(new Date(item.startDate), 'E, MMM d yyyy')}</Table.Cell>
                <Table.Cell>{item?.verified ? 'Verified' : 'Pending'}</Table.Cell>
                <Table.Cell>{item?.ratings || 0} / 5</Table.Cell>
                <Table.Cell>{item?.organizerId?.full_name}</Table.Cell>
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
                      <Link to={`/Event/${item._id}`}>
                        <Icon icon="solar:diagram-down-bold" height={18} /> View stats
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => OpenModal(item)}>
                      <Icon icon="solar:pen-new-square-broken" height={18} /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteEvent(item._id)}>
                      <Icon icon="solar:trash-bin-minimalistic-outline" height={18} /> Delete
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center mb-4 mt-2 ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <EditEventModal
        eventData={editedevents}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        getEvents={() => getEvents(currentPage)}
      />
    </>
  );
};

export default EventTable;
