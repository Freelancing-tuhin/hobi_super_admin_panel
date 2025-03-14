import { useEffect, useState } from 'react';
// import { AuthContext } from 'src/context/authContext/AuthContext';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { getOrganizers } from 'src/service/getOrganizers';
import { Table, Pagination, Modal, Button, Badge, Tooltip } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { editOrganizer } from 'src/service/editOrganizer';
import { useNavigate } from 'react-router';
import SearchBox from 'src/views/forms/searchBox/SearchBox';
import DownloadCv from 'src/views/ui-components/DownloadCv';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SPinner } from 'src/layouts/full/shared/Spinner';
import axios from 'axios';
import { API_BASE_URL } from 'src/config/config';
import { formatDateTime } from 'src/service/formatDate';

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);
  const [editedOrganizer] = useState<any>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!'); // You can replace this with a tooltip
  };
  const getOrganizer = async (page = 1) => {
    setLoading(true);
    try {
      const response: any = await axios.get(`${API_BASE_URL}/api/v1/transaction/get-all`, {
        params: { page, limit: 4, amount: searchText },
      });
      setOrganizers(response?.data.result || []);
      setTotalPages(response.data.pagination?.totalPages);
      console.log('======>list organizer', response?.pagination?.totalPages);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizer(currentPage);
  }, [currentPage, searchText]);

  return (
    <>
      <div className="flex justify-between">
        <SearchBox
          setSearchText={setSearchText}
          searchText={searchText}
          getOrganizer={getOrganizer}
          placeholder={'Search by amount..'}
        />
      </div>
      <div className="overflow-x-auto border rounded-md border-ld overflow-x-auto">
        {loading ? (
          <div className="h-32">
            <SPinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Payment Id</Table.HeadCell>
              <Table.HeadCell>Transaction Date</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y divide-y divide-border dark:divide-darkborder">
              {organizers.map((service: any) => (
                <Table.Row key={service._id}>
                  <Table.Cell className="flex gap-2 items-center text-gray-700 font-semibold">
                    {service?.amount}
                  </Table.Cell>
                  <Table.Cell>{service?.type}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      className={`px-3 py-1 text-xs font-semibold text-white rounded-md ${
                        service?.status === 'success'
                          ? 'bg-green-500'
                          : service?.status === 'failed'
                          ? 'bg-red-500'
                          : 'bg-yellow-300'
                      }`}
                    >
                      {service?.status}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell className="flex items-center gap-2">
                    <span>{service?.reference}</span>
                    <Tooltip content="Copy">
                      <button
                        onClick={() => copyToClipboard(service?.reference)}
                        className="p-1 rounded-md hover:bg-gray-200 transition"
                      >
                        <Icon icon="material-symbols:content-copy-outline" height="18" />
                      </button>
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>{formatDateTime(service.updatedAt)}</Table.Cell>
                  <Table.Cell className="flex gap-2 items-center">
                    <Button
                      color="blue"
                      size="xs"
                      className="bg-gray-600"
                      // onClick={() => openEditModal(service)}
                    >
                      <Icon icon="solar:eye-bold" height="18" /> View
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
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
