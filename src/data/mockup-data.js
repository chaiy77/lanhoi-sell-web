import metalsheetImage from 'images/metalsheet.jpg';
import fenceImage from 'images/fence.jpg';
import pileImage from 'images/pile.jpg';
import concreteImage from 'images/concrete.jpg';
import slabImage from 'images/slab.jpg';
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
        index: 'Pile',
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
        index: 'Slab',
        text: 'แผ่นพื้นคอนกรีต',
        unit: 'pieces',
        products: [
          { name: '1.5 m/4 lines', price: 400 },
          { name: '1.5 m/6 lines', price: 450 },
        ],
      },
    ],
    image: slabImage,
  },
  {
    type: 'รั้วคอนกรีต',
    path: 'fence',
    groups: ['รั้วคอนกรีต'],
    image: fenceImage,
  },
  {
    type: 'RetainingWall',
    path: 'retainingwall',
    groups: ['กำแพงกันดิน'],
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

export { ProductGroups, RoofTypes, MockOrders };
