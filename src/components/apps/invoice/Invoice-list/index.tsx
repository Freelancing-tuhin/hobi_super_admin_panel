import { useContext, useState } from 'react';
import { Checkbox, Table, Button, Modal, Badge, Tooltip } from 'flowbite-react';

import { Icon } from '@iconify/react';

import { Link } from 'react-router';
import { InvoiceContext } from 'src/context/InvoiceContext';

function InvoiceList() {
  const { invoices, deleteInvoice } = useContext(InvoiceContext);
  const [searchTerm] = useState('');
  const [activeTab] = useState('All');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    (invoice: { billFrom: string; billTo: string; status: string }) => {
      return (
        (invoice.billFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.billTo.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeTab === 'All' || invoice.status === activeTab)
      );
    },
  );

  // Toggle all checkboxes
  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(invoices.map((invoice: { id: any }) => invoice.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Handle opening delete confirmation dialog
  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  // Handle confirming deletion of selected products
  const handleConfirmDelete = async () => {
    for (const productId of selectedProducts) {
      await deleteInvoice(productId);
    }
    setSelectedProducts([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

  // Handle closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox className="checkbox" checked={selectAll} onChange={toggleSelectAll} />
            </Table.HeadCell>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>BILL FROM</Table.HeadCell>
            <Table.HeadCell>BILL TO</Table.HeadCell>
            <Table.HeadCell>TOTAL COST</Table.HeadCell>
            <Table.HeadCell>STATUS</Table.HeadCell>
            <Table.HeadCell className="text-center">ACTION</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {filteredInvoices.map(
              (invoice: { id: any; billFrom: any; billTo: any; totalCost: any; status: any }) => (
                <Table.Row key={invoice.id}>
                  <Table.Cell className="p-4">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      alt=""
                      className="bg-gray-500 h-12 w-12 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <h5 className="text-sm">{invoice.id}</h5>
                  </Table.Cell>
                  <Table.Cell>
                    <h5 className="text-sm">{invoice.billFrom}</h5>
                  </Table.Cell>
                  <Table.Cell className="text-ld">{invoice.billTo}</Table.Cell>
                  <Table.Cell className="text-ld">{invoice.totalCost}</Table.Cell>
                  <Table.Cell>
                    {invoice.status === 'Shipped' ? (
                      <Badge color="success">{invoice.status}</Badge>
                    ) : invoice.status === 'Delivered' ? (
                      <Badge color="secondary">{invoice.status}</Badge>
                    ) : invoice.status === 'Pending' ? (
                      <Badge color="warning">{invoice.status}</Badge>
                    ) : (
                      ''
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <div className="flex justify-center gap-3">
                      <Tooltip content="Edit Invoice" placement="bottom">
                        <Button className="btn-circle p-0 mb-2 bg-lightsuccess  text-success hover:bg-success hover:text-white">
                          <Link to={`/apps/invoice/edit/${invoice.billFrom}`}>
                            <Icon icon="solar:pen-outline" height={18} />
                          </Link>
                        </Button>
                      </Tooltip>
                      <Tooltip content="View Invoice" placement="bottom">
                        <Button color={'lightprimary'} className="btn-circle p-0 mb-2">
                          <Link to={`/apps/invoice/detail/${invoice.billFrom}`}>
                            <Icon icon="solar:eye-outline" height={18} />
                          </Link>
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete Invoice" placement="bottom">
                        <Button
                          color={'lighterror'}
                          className="btn-circle p-0 mb-2"
                          onClick={() => {
                            setSelectedProducts([invoice.id]);
                            handleDelete();
                          }}
                        >
                          <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ),
            )}
          </Table.Body>
        </Table>
      </div>
      <Modal show={openDeleteDialog} onClose={handleCloseDeleteDialog} size={'md'}>
        <Modal.Body>
          <p className="text-center text-lg text-ld">
            Are you sure you want to delete selected products?
          </p>
        </Modal.Body>
        <Modal.Footer className="mx-auto">
          <Button color="lighterror" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InvoiceList;
