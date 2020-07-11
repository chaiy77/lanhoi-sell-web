import metalsheetDemo from 'images/metalsheetDemo.jpg';

const ProductGroups = [
  {
    type: 'MetalSheet',
    groups: ['MetalSheet', 'Screw', 'PU-Form'],
    image: metalsheetDemo,
  },
  { type: 'Concrete', groups: ['Concrete'], image: metalsheetDemo },
  { type: 'Pile', groups: ['I-Column'], image: metalsheetDemo },
  { type: 'Slab', groups: ['Concrete Slab'], image: metalsheetDemo },
  { type: 'Fence', groups: ['Concrete Fence'], image: metalsheetDemo },
  { type: 'RetainingWall', groups: ['Retaining Wall'], image: metalsheetDemo },
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
