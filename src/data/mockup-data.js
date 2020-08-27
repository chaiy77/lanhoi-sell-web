import metalsheetDemo from 'images/metalsheetDemo.jpg';

const ProductGroups = [
  {
    type: 'เมทัลชีท',
    path: 'metalsheet',
    groups: ['แผ่นเมทัลชีท', 'สกรู', 'พียู-โฟม'],
    image: metalsheetDemo,
  },
  {
    type: 'Concrete',
    path: 'concrete',
    groups: ['คอนกรีต'],
    image: metalsheetDemo,
  },
  {
    type: 'Pile',
    path: 'pile',
    groups: ['เสาเข็มคอนกรีต'],
    image: metalsheetDemo,
  },
  {
    type: 'Slab',
    path: 'slab',
    groups: ['แผ่นพื้นคอนกรีต'],
    image: metalsheetDemo,
  },
  {
    type: 'รั้วคอนกรีต',
    path: 'fence',
    groups: ['รั้วคอนกรีต'],
    image: metalsheetDemo,
  },
  {
    type: 'RetainingWall',
    path: 'retainingwall',
    groups: ['กำแพงกันดิน'],
    image: metalsheetDemo,
  },
];

const RoofTypes = [
  { name: 'type A', needA: true, needB: true, needC: true },
  { name: 'type B', needA: true, needB: true, needC: false },
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
