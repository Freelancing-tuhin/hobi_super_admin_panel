import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { Table, Modal, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { API_BASE_URL } from 'src/config/config';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { formatDateTime } from 'src/service/formatDate';
// import { createServiceAPi } from 'src/service/service';

const ServiceList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Services' }];
  const [services, setServices] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/services/get-all`);
      setServices(response.data.result);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const createService = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/services/create`,
        {
          service_name: serviceName,
          description: description,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setServices([...services, response.data.result]);
      setIsModalOpen(false);
      setServiceName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const deleteService = async (id: any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return { success: false, message: 'Deletion canceled' };
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/services/delete`, {
        params: { id },
      });

      fetchServices();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <div className="p-6">
        <BreadcrumbComp title="All Services" items={BCrumb} />

        <CardBox>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 w-44 flex-end ml-auto bg-blue-500"
          >
            <Icon icon="material-symbols:add-box" height="18" /> Create Service
          </Button>
          <div className="overflow-x-auto border rounded-md border-ld overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Service Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Total Accounts</Table.HeadCell>
                <Table.HeadCell>Last Updated</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {services.map((organizer: any) => (
                  <Table.Row key={organizer._id} className="bg-white">
                    <Table.Cell className="flex gap-2 items-center text-gray-700 font-semibold">
                      {organizer?.service_name}
                    </Table.Cell>
                    <Table.Cell>{organizer.description}</Table.Cell>
                    <Table.Cell>{organizer?.organizerCount}</Table.Cell>
                    <Table.Cell>{formatDateTime(organizer.updatedAt)}</Table.Cell>
                    <Table.Cell className="flex gap-2 items-center">
                      <Button color="yellow" size="xs" className="bg-yellow-300">
                        <Icon icon="material-symbols:edit-document" height="18" /> Edit
                      </Button>
                      <Button
                        color="blue"
                        size="xs"
                        className="bg-red-500"
                        onClick={() => deleteService(organizer._id)}
                      >
                        <Icon icon="solar:trash-bin-minimalistic-bold-duotone" height="18" /> Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </CardBox>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceName" value="Service Name" />
              <TextInput
                id="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <TextInput
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createService}>Create</Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceList;
