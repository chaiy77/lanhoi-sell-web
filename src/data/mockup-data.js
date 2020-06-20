import metalsheetDemo from 'images/metalsheetDemo.jpg';

const ProductGroups = [
  {
    type: 'MetalSheet',
    groups: ['MetalSheet', 'Screw', 'PU-Form'],
    image: metalsheetDemo,
  },
  { type: 'Concrete', groups: ['Concrete'], image: metalsheetDemo },
  { type: 'Column', groups: ['I-Column'], image: metalsheetDemo },
  { type: 'Floor Sheet', groups: ['Concrete'], image: metalsheetDemo },
];

const RoofTypes = [
  { name: 'type A', needA: true, needB: true, needC: true },
  { name: 'type B', needA: true, needB: true, needC: false },
];

export { ProductGroups, RoofTypes };
