import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { Table, Modal, Button, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { API_BASE_URL } from 'src/config/config';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { SPinner } from 'src/layouts/full/shared/Spinner';
import { formatDateTime } from 'src/service/formatDate';

const ServiceList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Services' }];
  const [services, setServices] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/services/get-all`);
      setServices(response.data.result);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = async () => {
    try {
      if (editMode && currentServiceId) {
        // Edit service
        const response = await axios.patch(`${API_BASE_URL}/api/v1/services/edit`, {
          id: currentServiceId,
          service_name: serviceName,
          description: description,
        });
        setServices(
          services.map((service: any): any =>
            service._id === currentServiceId ? response.data.result : service,
          ),
        );
      } else {
        // Create service
        const response = await axios.post(`${API_BASE_URL}/api/v1/services/create`, {
          service_name: serviceName,
          description: description,
        });
        setServices([...services, response.data.result]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const openEditModal = (service: any) => {
    setServiceName(service.service_name);
    setDescription(service.description);
    setCurrentServiceId(service._id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setServiceName('');
    setDescription('');
    setEditMode(false);
    setCurrentServiceId(null);
  };

  const deleteService = async (id: any) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/v1/services/delete`, { params: { id } });
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <div className="">
        <BreadcrumbComp title="All Services" items={BCrumb} />

        <CardBox>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 w-44 flex-end ml-auto bg-blue-500"
          >
            <Icon icon="material-symbols:add-box" height="18" /> Create Service
          </Button>
          <div className="overflow-x-auto border rounded-md border-ld overflow-x-auto">
            {loading ? (
              <div className="h-32">
                <SPinner />
              </div>
            ) : (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Service Name</Table.HeadCell>
                  <Table.HeadCell>Description</Table.HeadCell>
                  <Table.HeadCell>Total Accounts</Table.HeadCell>
                  <Table.HeadCell>Last Updated</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-y divide-border dark:divide-darkborder">
                  {services.map((service: any) => (
                    <Table.Row key={service._id}>
                      <Table.Cell className="flex gap-2 items-center text-gray-700 font-semibold">
                        {service?.service_name}
                      </Table.Cell>
                      <Table.Cell>{service.description}</Table.Cell>
                      <Table.Cell>{service?.organizerCount}</Table.Cell>
                      <Table.Cell>{formatDateTime(service.updatedAt)}</Table.Cell>
                      <Table.Cell className="flex gap-2 items-center">
                        <Button
                          color="blue"
                          size="xs"
                          className="bg-gray-600"
                          onClick={() => openEditModal(service)}
                        >
                          <Icon icon="material-symbols:edit-document" height="18" /> Edit
                        </Button>
                        <Button
                          color="blue"
                          size="xs"
                          className="bg-red-500"
                          onClick={() => deleteService(service._id)}
                        >
                          <Icon icon="solar:trash-bin-minimalistic-bold-duotone" height="18" />{' '}
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
        </CardBox>
      </div>

      {/* Modal for Creating/Editing Service */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>{editMode ? 'Edit Service' : 'Create Service'}</Modal.Header>
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
          <Button onClick={handleSaveService}>{editMode ? 'Update' : 'Create'}</Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceList;
