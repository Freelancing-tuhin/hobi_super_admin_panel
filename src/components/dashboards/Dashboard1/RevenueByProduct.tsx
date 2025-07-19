import { useState } from 'react';
import CardBox from '../../shared/CardBox';
import { Table } from 'flowbite-react';
import { Icon } from '@iconify/react';
import React from 'react';
import SimpleBar from 'simplebar-react';

const RevenueByProduct = ({ usersList }: any) => {
  const [activeTab, setActiveTab] = useState('All');
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <CardBox className="pb-3">
        <div className="sm:flex justify-between align-baseline">
          <div>
            <h5 className="card-title">Users List</h5>
          </div>
        </div>
        {/* Tabs */}
        <div className="overflow-x-auto">
          <SimpleBar>
            <div className="flex gap-4">
              {['All', 'Male', 'Female'].map((tab) => (
                <div
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary ${
                    activeTab === tab
                      ? 'text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis'
                      : 'dark:text-white'
                  }`}
                >
                  <Icon
                    icon={
                      tab === 'All'
                        ? 'solar:widget-linear'
                        : tab === 'Male'
                        ? 'solar:smartphone-line-duotone'
                        : 'solar:folder-open-outline'
                    }
                    className={`${activeTab === tab ? 'opacity-100' : 'opacity-50'}`}
                    height={16}
                  />
                  {tab}
                </div>
              ))}
            </div>
          </SimpleBar>
        </div>

        {/* Tabs Content */}
        <div className="overflow-x-auto">
          <Table>
            <Table.Head className="border-b border-bordergray dark:border-darkborder">
              <Table.HeadCell className="py-2 px-3 ps-0 text-ld font-normal">Name</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Email</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Address</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Amount Paid</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-bordergray dark:divide-darkborder">
              {usersList &&
                usersList
                  .filter(
                    (user: any) =>
                      activeTab === 'All' ||
                      user.userDetails.gender.toUpperCase() === activeTab.toUpperCase(),
                  )
                  .map((user: any, index: any) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap ps-0">
                        <p className="text-sm">{user.userDetails.full_name}</p>
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-sm">{user.userDetails.email}</p>
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-sm">{user.userDetails.address}</p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-ld">₹{user.amountPaid}</p>
                      </Table.Cell>
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default RevenueByProduct;
