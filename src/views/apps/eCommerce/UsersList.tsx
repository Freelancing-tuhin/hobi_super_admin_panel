import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { Table, Button, Modal, Pagination } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { useNavigate } from 'react-router';
import { SPinner } from 'src/layouts/full/shared/Spinner';
import { getAllUsers } from 'src/service/getUsers';
import SearchBox from 'src/views/forms/searchBox/SearchBox';
import DownloadCv from 'src/views/ui-components/DownloadCv';

const UserList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Users list' }];

  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 8,
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers({ search: searchText, page, limit: pagination.limit });
      setUsersList(response?.result || []);
      setPagination(response?.pagination || {});
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchText, page]);

  return (
    <>
      <div className="">
        <BreadcrumbComp title="Users list" items={BCrumb} />
        <CardBox>
          <div className="flex justify-between">
            <SearchBox
              setSearchText={setSearchText}
              searchText={searchText}
              getOrganizer={fetchUsers}
              placeholder="Search by name or email.."
            />
            <DownloadCv data={usersList} />
          </div>
          <div className="overflow-x-auto border rounded-md border-ld">
            {loading ? (
              <div className="h-32">
                <SPinner />
              </div>
            ) : (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Address</Table.HeadCell>
                  <Table.HeadCell>Total Bookings</Table.HeadCell>
                  <Table.HeadCell>Booking History</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-border dark:divide-darkborder">
                  {usersList.map((user: any) => (
                    <Table.Row key={user.id}>
                      <Table.Cell className="flex gap-2 items-center text-gray-700 font-semibold">
                        {user.full_name}
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.address}</Table.Cell>
                      <Table.Cell>{user?.bookings.length}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="xs"
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenModal(true);
                          }}
                        >
                          View History
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardBox>
      </div>

      {/* Booking History Modal */}
      {selectedUser && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Booking History of {selectedUser.full_name}</Modal.Header>
          <Modal.Body>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Event</Table.HeadCell>
                <Table.HeadCell>Booking Status</Table.HeadCell>
                <Table.HeadCell>Payment Status</Table.HeadCell>
                <Table.HeadCell>Amount Paid</Table.HeadCell>
                <Table.HeadCell>Ticket Count</Table.HeadCell>
                <Table.HeadCell>Event Details</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {selectedUser.bookings.map((booking: any) => (
                  <Table.Row key={booking._id}>
                    <Table.Cell>{booking?.eventDetails[0]?.title}</Table.Cell>
                    <Table.Cell>{booking?.booking_status}</Table.Cell>
                    <Table.Cell>{booking?.paymentStatus}</Table.Cell>
                    <Table.Cell>{booking?.amountPaid}</Table.Cell>
                    <Table.Cell>{booking?.ticketsCount}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="xs"
                        onClick={() => navigate(`/Event/${booking?.eventDetails[0]?._id}`)}
                      >
                        View Event
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default UserList;
