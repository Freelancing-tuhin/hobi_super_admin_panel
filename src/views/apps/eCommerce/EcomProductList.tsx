// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { ProductProvider } from '../../../context/Ecommercecontext';
import BreadcrumbComp from '../../../layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductTableList from '../../../components/apps/ecommerce/productTableList/ProductTableList';
import LockScreen from 'src/views/authentication/lockScreen/LockScreen';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Event list',
  },
];

const EcomProductList = () => {
  return (
    <ProductProvider>
      <LockScreen />
      <BreadcrumbComp title="Event list" items={BCrumb} />
      <ProductTableList />
    </ProductProvider>
  );
};

export default EcomProductList;
