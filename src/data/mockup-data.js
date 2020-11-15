import metalsheetImage from 'images/metalsheet.jpg';
import fenceImage from 'images/fence.jpg';
import pileImage from 'images/pile.jpg';
import concreteImage from 'images/concrete.jpg';
import slabImage from 'images/slab.jpg';
import * as R from 'ramda';

import { string } from 'prop-types';

const ProductGroups = [
  {
    type: 'เมทัลชีท',
    path: 'metalsheet',
    groups: [
      {
        index: 'Metalsheet',
        text: 'แผ่นเมทัลชีท',
        unit: 'แผ่น',
        products: [
          { name: 'LH/แดง/0.5', price: 60 },
          { name: 'LH/เขียว/0.5', price: 60 },
          { name: 'LH/โปร่งแสง/0.5', price: 150 },
        ],
      },
      {
        index: 'Screw',
        text: 'สกรู',
        unit: 'ตัว',
        products: [
          { name: 'LH/1 inch', price: 60 },
          { name: 'LH/1.5 inch', price: 60 },
        ],
      },
      {
        index: 'PU-Foam',
        text: 'พียู-โฟม',
        unit: 'ตารางเมตร',
        products: [
          { name: 'LH/สีขาว', price: 60 },
          { name: 'LH/ดำ', price: 60 },
        ],
      },
    ],
    image: metalsheetImage,
  },
  {
    type: 'Concrete',
    path: 'concrete',
    groups: [
      {
        index: 'Concrete',
        text: 'คอนกรีต',
        unit: 'm*m',
        products: [
          { name: 'ST-210', price: 1000 },
          { name: 'ST-240', price: 1100 },
        ],
      },
    ],
    image: concreteImage,
  },
  {
    type: 'Pile',
    path: 'pile',
    groups: [
      {
        index: 'เสาเข็มคอนกรีต',
        text: 'เสาเข็มคอนกรีต',
        unit: 'm',
        products: [
          { name: '12 inches', price: 1200 },
          { name: '10 inches', price: 1000 },
        ],
      },
    ],
    image: pileImage,
  },
  {
    type: 'Slab',
    path: 'slab',
    groups: [
      {
        index: 'แผ่นพื้นคอนกรีต',
        text: 'แผ่นพื้นคอนกรีต',
        unit: 'pieces',
        products: [
          { name: '1.0 m/4 lines', long: 1.0, price: 400 },
          { name: '1.0 m/6 lines', long: 1.0, price: 450 },
          { name: '1.5 m/4 lines', long: 1.5, price: 400 },
          { name: '1.5 m/6 lines', long: 1.5, price: 450 },
          { name: '2.0 m/4 lines', long: 2.0, price: 400 },
          { name: '2.0 m/6 lines', long: 2.0, price: 450 },
        ],
      },
    ],
    image: slabImage,
  },
  {
    type: 'รั้วคอนกรีต',
    path: 'fence',
    groups: [
      {
        index: 'แผ่นรั้ว',
        text: 'แผ่นรั้ว',
        unit: 'แผ่น',
        products: [
          { name: '1.5 m', price: 150 },
          { name: '1.5 m / 6 lines', price: 150 },
        ],
      },
      {
        index: 'เสารั้ว',
        text: 'เสารั้ว',
        unit: 'ต้น',
        products: [{ name: '1.5 m', price: 400 }],
      },
    ],
    image: fenceImage,
  },
  {
    type: 'กำแพงกันดิน',
    path: 'retainingwall',
    groups: [
      {
        index: 'แผ่นรั้ว',
        text: 'แผ่นรั้ว',
        unit: 'แผ่น',
        products: [
          { name: 'ร้ัวคอนกรีต 1.5 m / 4 lines', price: 150 },
          { name: 'ร้ัวคอนกรีต 1.5 m / 6 lines', price: 150 },
        ],
      },
      {
        index: 'เสารั้ว',
        text: 'เสารั้ว',
        unit: 'ต้น',
        products: [{ name: 'เสารั้ว 1.5 m', price: 400 }],
      },
    ],
    image: fenceImage,
  },
];

const RoofTypes = [
  { name: 'type A', needA: true, needB: true, needC: false },
  { name: 'type B', needA: true, needB: true, needC: true },
  { name: 'type C', needA: true, needB: true, needC: true },
  { name: 'type D', needA: true, needB: true, needC: false },
  { name: 'type E', needA: true, needB: true, needC: false },
  { name: 'type F', needA: true, needB: true, needC: false },
  { name: 'type G', needA: true, needB: true, needC: false },
];

const concreteUseType = [
  { name: ' usecase A' },
  { name: ' usecase B' },
  { name: ' usecase C' },
];

const slabLongType = [1, 1.5, 2];

const MockOrders = {
  metalsheet: {
    areas: [
      {
        no: 1,
        type: 'type A',
        products: [{ metalsheet: 30 }, { puFoam: 30 }, { screw: 100 }],
      },
      {
        no: 2,
        type: 'type B',
        products: [{ metalsheet: 60 }, { puFoam: 50 }, { screw: 2000 }],
      },
    ],
  },
  concrete: {
    areas: [
      { no: 1, products: [{ concrete210: 100 }] },
      { no: 2, products: [{ concrete190: 200 }] },
    ],
  },
};

const getProductPrice = (productType, productName) => {
  const _prodGroup = R.find(R.propEq('type', productType))(ProductGroups);
  // console.log(_prodGroup);
  let price = 0;
  _prodGroup.groups.map(group => {
    // console.log(group);
    group.products.map(prod => {
      if (productName === prod.name) {
        console.log(prod.price);
        price = prod.price;
        return;
      }
    });
  });
  return price;
};

const getProductUnit = (productType, productName) => {
  const _prodGroup = R.find(R.propEq('type', productType))(ProductGroups);
  // console.log(_prodGroup);
  let unit = 0;
  _prodGroup.groups.map(group => {
    // console.log(group);
    group.products.map(prod => {
      if (productName === prod.name) {
        // console.log(prod.price);
        unit = group.unit;
        return;
      }
    });
  });
  return unit;
};

export {
  ProductGroups,
  RoofTypes,
  MockOrders,
  slabLongType,
  concreteUseType,
  getProductPrice,
  getProductUnit,
};
