import { useEffect, useState } from 'react';
// import { AuthContext } from 'src/context/authContext/AuthContext';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { getOrganizers } from 'src/service/getOrganizers';
import { Table, Pagination, Modal, Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { editOrganizer } from 'src/service/editOrganizer';
import { useNavigate } from 'react-router';
import SearchBox from 'src/views/forms/searchBox/SearchBox';
import DownloadCv from 'src/views/ui-components/DownloadCv';
import { Icon } from '@iconify/react/dist/iconify.js';

const OrganizerList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Organizers list' }];

  // const { user }: any = useContext(AuthContext);
  const [organizers, setOrganizers] = useState([]);
  const [editedOrganizer, setEditedOrganizer] = useState<any>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedOrganizer(data);
  };

  const getOrganizer = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getOrganizers({ filter: { page, limit: 4, search: searchText } });
      setOrganizers(response?.result || []);
      setTotalPages(response.pagination?.totalPages);
      console.log('======>list organizer', response?.pagination?.totalPages);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    } finally {
      setLoading(false);
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
  }, [currentPage, searchText]);

  return (
    <>
      <div className="p-6">
        <BreadcrumbComp title="Organizers list" items={BCrumb} />
        <CardBox>
          <div className="overflow-x-auto border rounded-md border-ld overflow-x-auto">
            <div className="flex justify-between items-center">
              <SearchBox
                setSearchText={setSearchText}
                searchText={searchText}
                getOrganizer={getOrganizer}
              />
              <DownloadCv data={organizers} />
            </div>

            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Events</Table.HeadCell>
                <Table.HeadCell>Account status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              {loading ? (
                <div className="flex pl-10 items-center h-32">
                  <div role="status mx-auto">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <div className="text-sm text-gray-700 ml-2">just wait moment...</div>
                </div>
              ) : (
                <>
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

                        <Table.Cell className="flex">
                          {/* <Button
                        size="xs"
                        className="bg-gray-700 p-1.5"
                        onClick={() => OpenModal(organizer)}
                      >
                        Rest Password
                      </Button> */}
                          <button
                            className="px-3 flex gap-2 items-center py-2.5 bg-indigo-500 text-white rounded-md hover:bg-blue-700 transition"
                            onClick={() => navigate(`/organizer/${organizer?._id}`)}
                          >
                            <Icon icon="solar:eye-bold" height="18" />
                            View Profile
                          </button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </>
              )}
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
