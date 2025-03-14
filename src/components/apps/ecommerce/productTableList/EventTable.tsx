import { Icon } from '@iconify/react/dist/iconify.js';
import { format } from 'date-fns';
import { Table, Pagination, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import EditEventModal from './EditEventModal';
// import { deleteEvent } from 'src/service/deleteEvent';

const EventTable = ({ events, totalPages, getEvents, searchText }: any) => {
  const [editedevents, setEditedevents] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedevents(data);
  };

  // const handleDeleteEvent = async (eventId: any) => {
  //   try {
  //     await deleteEvent(eventId);
  //     getEvents(currentPage);
  //   } catch (error) {
  //     console.error('Failed to delete event:', error);
  //   }
  // };

  useEffect(() => {
    getEvents(currentPage);
  }, [currentPage, searchText]);

  return (
    <>
      <div className="border rounded-md border-ld overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Events</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
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
                <Table.Cell>{item?.ratings || 0} / 5</Table.Cell>
                <Table.Cell>{item?.organizerId?.full_name}</Table.Cell>
                <Table.Cell className="flex gap-2 items-center">
                  <Link to={`/Event/${item._id}`}>
                    <Button
                      color="blue"
                      size="xs"
                      className="bg-blue-500"
                      // onClick={() => openEditModal(service)}
                    >
                      <Icon icon="solar:presentation-graph-bold" height="18" />
                    </Button>
                  </Link>
                  <Button
                    color="blue"
                    size="xs"
                    className="bg-gray-500"
                    onClick={() => OpenModal(item)}
                  >
                    <Icon icon="material-symbols:edit-document" height="18" />
                  </Button>
                  {/* <Button
                    color="blue"
                    size="xs"
                    className="bg-red-500"
                    // onClick={() => deleteService(service._id)}
                  >
                    <Icon icon="solar:trash-bin-minimalistic-bold-duotone" height="18" />
                  </Button> */}
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
