import { useEffect, useState } from 'react';
// import { AuthContext } from 'src/context/authContext/AuthContext';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { getOrganizers } from 'src/service/getOrganizers';
import { Table, Pagination, Modal, Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { editOrganizer } from 'src/service/editOrganizer';
import { useNavigate } from 'react-router';

const OrganizerList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Organizers list' }];

  // const { user }: any = useContext(AuthContext);
  const [organizers, setOrganizers] = useState([]);
  const [editedOrganizer, setEditedOrganizer] = useState<any>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedOrganizer(data);
  };

  const getOrganizer = async (page = 1) => {
    try {
      const response = await getOrganizers({ filter: { page, limit: 4 } });
      setOrganizers(response?.result || []);
      setTotalPages(response.pagination?.totalPages);
      console.log('======>list organizer', response?.pagination?.totalPages);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  };
  const handleVerificationToggle = async (organizer: any) => {
    try {
      const response = await editOrganizer({
        id: organizer?._id,
        updateData: { is_verified: !organizer?.is_verified },
      })
        .then((response) => {
          getOrganizer(currentPage);
        })
        .catch((error) => console.error('Update failed:', error));
    } catch (error) {}
  };
  useEffect(() => {
    getOrganizer(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="p-6">
        <BreadcrumbComp title="Organizers list" items={BCrumb} />
        <CardBox>
          <div className="overflow-x-auto border rounded-md border-ld overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Events</Table.HeadCell>
                <Table.HeadCell>Account status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {organizers.map((organizer: any) => (
                  <Table.Row key={organizer.id} className="bg-white">
                    <Table.Cell className="flex gap-2 items-center text-gray-700 font-semibold">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          organizer?.profile_pic
                            ? organizer?.profile_pic
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWLjkYKGswBE2f9mynFkd8oPT1W4Gx8RpDQ&s'
                        }
                        alt=""
                      />
                      {organizer.full_name}
                    </Table.Cell>
                    <Table.Cell>{organizer.email}</Table.Cell>
                    <Table.Cell>{organizer.totalEvents}</Table.Cell>
                    <Table.Cell className="">
                      <>
                        <input
                          type="checkbox"
                          checked={organizer.is_verified}
                          onChange={() => handleVerificationToggle(organizer)}
                          className="w-5 h-5  mr-2 text-green-500 border-gray-300 rounded focus:ring-green-500"
                        />
                        {organizer.is_verified ? (
                          <span className="text-green-500 text-gray-700 font-semibold">
                            Verified
                          </span>
                        ) : (
                          <span className="text-gray-500 text-gray-700 font-semibold">
                            Verified
                          </span>
                        )}
                      </>
                    </Table.Cell>

                    <Table.Cell className="flex gap-2">
                      {/* <Button
                        size="xs"
                        className="bg-gray-700 p-1.5"
                        onClick={() => OpenModal(organizer)}
                      >
                        Rest Password
                      </Button> */}
                      <Button
                        size="xs"
                        className="bg-indigo-500 p-1.5"
                        onClick={() => navigate(`/organizer/${organizer?._id}`)}
                      >
                        View Profile
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </CardBox>
      </div>

      {/* Edit Modal */}
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit Organizer</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Name"
              defaultValue={editedOrganizer?.full_name}
            />
            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="Email"
              defaultValue={editedOrganizer?.email}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenEditModal(false)}>Close</Button>
          <Button color="blue">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrganizerList;
