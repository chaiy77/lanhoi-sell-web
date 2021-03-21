import metalsheetImage from 'images/metalsheet.jpg';
import fenceImage from 'images/fence.jpg';
import pileImage from 'images/pile.jpg';
import concreteImage from 'images/concrete.jpg';
import slabImage from 'images/slab.jpg';
import * as R from 'ramda';

import { string } from 'prop-types';

const ProductGroups = [
  {
    type: 'Metalsheet',
    text: 'หลังคาเมทัลชีท',
    path: 'metalsheet',
    groups: [
      {
        index: 'Metalsheet',
        text: 'แผ่นเมทัลชีท',
        unit: 'แผ่น',
        products: [
          { name: 'ซิ้งค์/0.23', price: 63 },
          { name: 'ซิ้งค์/0.30', price: 85 },
          { name: 'ซิ้งค์/0.35', price: 95 },
          { name: 'ซิ้งค์ BLUE/0.30', price: 95 },
          { name: 'ซิ้งค์ BLUE/0.35', price: 105 },
          { name: 'ซิ้งค์ BLUE/0.40', price: 115 },
          { name: 'ซิ้งค์ BLUE/0.47', price: 160 },
          { name: 'สีนอก/0.30', price: 85 },
          { name: 'สีนอก/0.35', price: 100 },
          { name: 'สี BLUE/0.30', price: 110 },
          { name: 'อลูมิเนียม สีซิ้งค์/0.40', price: 130 },
          { name: 'อลูมิเนียม สี/0.40', price: 165 },
        ],
      },
      {
        index: 'Screw',
        text: 'สกรู',
        unit: 'ตัว',
        products: [
          { name: 'สกรู LH/1 inch', price: 60 },
          { name: 'สกรู LH/1.5 inch', price: 60 },
        ],
      },
      {
        index: 'PU-Foam',
        text: 'ฉนวน/พียู-โฟม',
        unit: 'ตารางเมตร',
        products: [
          { name: 'ฉนวนกันความร้อน /0.50', price: 45 },
          { name: 'พียูโฟม/0.20', price: 130 },
          { name: 'พียูโฟม/0.25', price: 145 },
        ],
      },
    ],
    image: metalsheetImage,
  },
  {
    type: 'Concrete',
    text: 'คอนกรีต',
    path: 'concrete',
    groups: [
      {
        index: 'Concrete',
        text: 'คอนกรีต',
        unit: 'คิว',
        products: [
          { name: 'คอนกรีต Lean', price: 1270 },
          { name: 'คอนกรีต KSC/Cube-180', price: 1520 },
          { name: 'คอนกรีต KSC/Cube-210', price: 1600 },
          { name: 'คอนกรีต KSC/Cube-240', price: 1655 },
          { name: 'คอนกรีต KSC/Cube-280', price: 1730 },
          { name: 'คอนกรีต KSC/Cube-320', price: 1795 },
          { name: 'คอนกรีต KSC/Cube-350', price: 1875 },
          { name: 'คอนกรีต KSC/Cube-380', price: 1930 },
          { name: 'คอนกรีต KSC/Cube-400', price: 2010 },
          { name: 'คอนกรีต C+Sand', price: 1885 },
        ],
      },
    ],
    image: concreteImage,
  },
  {
    type: 'Pile',
    text: 'เสาเข็มคอนกรีต',
    path: 'pile',
    groups: [
      {
        index: 'pile',
        text: 'เสาเข็มคอนกรีต',
        unit: 'ต้น',
        //price per meter.
        products: [
          { name: '15 x 15', price: 210 },
          { name: '18 x 18', price: 240 },
          { name: '22 x 22', price: 300 },
          { name: '26 x 26', price: 335 },
          { name: '30 x 30', price: 415 },
          { name: '40 x 40', price: 660 },
          { name: '15 x 15 มีหัวชู', price: 210 },
          { name: '18 x 18 มีหัวชู', price: 240 },
          { name: '22 x 22 มีหัวชู ', price: 300 },
          { name: '26 x 26 มีหัวชู', price: 335 },
          { name: '30 x 30 มีหัวชู', price: 415 },
          { name: '40 x 40 มีหัวชู', price: 660 },
        ],
      },
      {
        index: 'dowel',
        text: 'โดเวล',
        unit: 'เส้น',
        products: [
          { name: 'โดเวล ขนาด \u2205 1" ยาว 10"', price: 1200 },
          { name: 'โดเวล ขนาด \u2205 1/2" ยาว 10"', price: 1000 },
        ],
      },
    ],
    image: pileImage,
  },
  {
    type: 'Slab',
    text: 'แผ่นพื้นคอนกรีต',
    path: 'slab',
    groups: [
      {
        index: 'slab',
        text: 'แผ่นพื้นคอนกรีต',
        unit: 'แผ่น',
        products: [
          { name: '4 เส้น', price: 90 }, //price per meter.
          { name: '5 เส้น', price: 95 },
          { name: '6 เส้น', price: 100 },
          { name: '7 เส้น', price: 105 },
        ],
      },
    ],
    image: slabImage,
  },
  {
    type: 'Fence',
    text: 'รั้วคอนกรีต',
    path: 'fence',
    groups: [
      {
        index: 'แผ่นรั้ว',
        text: 'แผ่นรั้ว',
        unit: 'แผ่น',
        products: [
          { name: 'แผ่นคอนกรีต 1.5 m', price: 150 },
          { name: 'แผ่นคอนกรีต 1.5 m / 6 lines', price: 150 },
        ],
      },
      {
        index: 'เสารั้ว',
        text: 'เสารั้ว',
        unit: 'ต้น',
        products: [{ name: 'เสาคอนกรีต 1.5 m', price: 400 }],
      },
    ],
    image: fenceImage,
  },
  {
    type: 'Retainingwall',
    text: 'กำแพงกันดิน',
    path: 'retainingwall',
    groups: [
      {
        index: 'แผ่นคอนกรีต',
        text: 'แผ่นคอนกรีต',
        unit: 'แผ่น',
        products: [
          { name: 'แผ่นคอนกรีต 1.5 m / 4 lines', price: 150 },
          { name: 'แผ่นคอนกรีต 1.5 m / 6 lines', price: 150 }, //price per piece
        ],
      },
      {
        index: 'เสาคอนกรีต',
        text: 'เสาคอนกรีต',
        unit: 'ต้น',
        products: [{ name: 'เสาคอนกรีต สูง 1.5 m', price: 400 }], //price per meter per piece
      },
      {
        index: 'คานคอนดิน',
        text: 'คานคอดิน',
        unit: 'เมตร',
        products: [{ name: 'คานคอดิน หน้าตัด 18 cm.', price: 555 }], //price per meter
      },
    ],
    image: fenceImage,
  },
];

const RoofTypes = [
  { name: 'type A', needA: true, needB: true, needC: false },
  { name: 'type B', needA: true, needB: true, needC: false },
  { name: 'type C', needA: true, needB: true, needC: false },
  { name: 'type D', needA: true, needB: true, needC: false },
  // { name: 'type E', needA: true, needB: true, needC: false },
  // { name: 'type F', needA: true, needB: true, needC: false },
  // { name: 'type G', needA: true, needB: true, needC: false },
];

const concreteUseType = [
  { name: ' usecase A' },
  { name: ' usecase B' },
  { name: ' usecase C' },
];

const slabLongType = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];

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
  // console.log(productType);
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

