import { TextInput, Button, Alert } from 'flowbite-react';
import { useContext, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import 'react-datepicker/dist/react-datepicker.css';
import { ProductContext } from 'src/context/Ecommercecontext';
import { ProductType } from 'src/types/apps/eCommerce';
import CardBox from 'src/components/shared/CardBox';
import React from 'react';
import EventTable from './EventTable';

const ProductTablelist = () => {
  const { filteredAndSortedProducts, searchProducts, getProductById }: any =
    useContext(ProductContext);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [, setOpenDeleteDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [, setOpenEditModal] = useState(false);
  const [, setEditedProduct] = useState<ProductType | null>(null);
  const [, setImageURL] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    searchProducts(event.target.value);
  };

  const handleEdit = (productId: number) => {
    const product = getProductById(productId);

    if (product) {
      setEditedProduct(product);
      setImageURL(product.photo);
      setOpenEditModal(true);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(filteredAndSortedProducts.map((product: { id: any }) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: number) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id: number) => id !== productId));
    }
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      setShowAlert(true); // Show alert after adding contact
    } else {
      setOpenDeleteDialog(true);
    }
  };

  return (
    <>
      <CardBox>
        {/* Search  */}

        {/* Table */}
        <EventTable
          selectAll={selectAll}
          toggleSelectAll={toggleSelectAll}
          filteredAndSortedProducts={filteredAndSortedProducts}
          selectedProducts={selectedProducts}
          toggleSelectProduct={toggleSelectProduct}
          HiOutlineDotsVertical={HiOutlineDotsVertical}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        {/* <SimpleBar className="max-h-[580px]">
          <div className="border rounded-md border-ld overflow-x-auto">
            <Table className="">
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  <Checkbox className="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Events</Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Date</Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Status</Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Price</Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">Action</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {filteredAndSortedProducts.map(
                  (
                    item: {
                      id: number;
                      photo: string | undefined;
                      title:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                      category:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                      created: string | number | Date;
                      stock: any;
                      price:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap">
                        <Checkbox
                          className="checkbox"
                          onChange={() => toggleSelectProduct(item.id)}
                          checked={selectedProducts.includes(item.id)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.photo}
                            alt="icon"
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded"
                          />
                          <div className="text-no-wrap">
                            <h6 className="text-base">{item.title}</h6>
                            <p className="text-sm text-darklink dark:text-bodytext">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-sm text-darklink dark:text-bodytext font-medium">
                          {format(new Date(item.created), 'E, MMM d yyyy')}
                        </p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                          {item.stock ? (
                            <Badge color={'success'} className="h-2 w-2 p-0"></Badge>
                          ) : (
                            <Badge color={'error'} className="h-2 w-2 p-0"></Badge>
                          )}
                          {item.stock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <h5 className="text-base">${item.price}</h5>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                              <HiOutlineDotsVertical size={22} />
                            </span>
                          )}
                        >
                          <Dropdown.Item className="flex gap-3">
                            <Link to={'/Event/12'} className="flex gap-3">
                              <Icon icon="solar:diagram-down-bold" height={18} />
                              <span>View stats</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item className="flex gap-3" onClick={() => handleEdit(item.id)}>
                            <Icon icon="solar:pen-new-square-broken" height={18} />
                            <span>Edit</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete} className="flex gap-3">
                            <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                            <span>Delete</span>
                          </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ),
                )}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar> */}
      </CardBox>

      {showAlert && (
        <Alert
          color="warning"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit z-[50]"
          icon={() => <Icon icon="solar:archive-minimalistic-broken" className="" height={22} />}
        >
          <span className="ms-2">Please select products to delete.</span>
        </Alert>
      )}
    </>
  );
};

export default ProductTablelist;
