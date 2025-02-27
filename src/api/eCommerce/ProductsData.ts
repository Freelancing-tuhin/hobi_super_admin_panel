import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

import red_dress from '/src/assets/images/products/Updated_Products/red-valvet-dress.jpg';
import girls_shoes from '/src/assets/images/products/Updated_Products/shoes.jpg';
import sweet_purse from '/src/assets/images/products/Updated_Products/short-sweet-purse.jpg';
import soft_teddybear from '/src/assets/images/products/Updated_Products/teddybear.jpg';
import little_toy from '/src/assets/images/products/Updated_Products/little-angel-toy.jpg';
import dino_toy from '/src/assets/images/products/Updated_Products/toy-dino.jpg';

const chance = new Chance();

const ProductsData = [
  {
    title: 'Red Valvet Dress',
    price: 150,
    discount: 50,
    related: false,
    salesPrice: 200,
    category: ['fashion'],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: red_dress,
    id: 7,
    created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Shoes for Girls',
    price: 300,
    discount: 80,
    related: false,
    salesPrice: 380,
    category: ['fashion'],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: girls_shoes,
    id: 8,
    created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Short & Sweet Purse',
    price: 175,
    discount: 25,
    related: false,
    salesPrice: 200,
    category: ['fashion'],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#00AB55', '#000000'],
    photo: sweet_purse,
    id: 9,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Toy Dino for Fun',
    price: 210,
    discount: 40,
    related: false,
    salesPrice: 250,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FFC0CB', '#FF4842'],
    photo: dino_toy,
    id: 10,
    created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Cute Soft Teddybear',
    price: 285,
    discount: 60,
    related: false,
    salesPrice: 345,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: soft_teddybear,
    id: 11,
    created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Little Angel Toy',
    price: 5,
    discount: 5,
    related: false,
    salesPrice: 10,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: little_toy,
    id: 12,
    created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
];

mock.onGet('/api/data/eCommerce/ProductsData').reply(() => {
  return [200, ProductsData];
});

// Endpoint to add a product to the cart
mock.onPost('/api/data/eCommerce/add').reply((config) => {
  const { productId } = JSON.parse(config.data);
  const productToAdd = ProductsData.find((product) => product.id === productId);

  if (!productToAdd) {
    return [404, { error: 'Product not found' }];
  }

  // Simulate a delay before adding to cart (optional)
  return [200, productToAdd];
});

export default ProductsData;
