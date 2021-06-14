const fs = require('fs');

const brands = [
  {
    name: 'Plasmox',
  },
  {
    name: 'Avit',
  },
  {
    name: 'Accupharm',
  },
  {
    name: 'Nitracyr',
  },
  {
    name: 'Medmex',
  },
  {
    name: 'Shadease',
  },
  {
    name: 'Netbook',
  },
];

const objects = Array.from({ length: 100000 }, () => ({
  brand: brands[Math.floor(Math.random() * 6)].name,
  allon: parseFloat((Math.random() * 2 + 4.5).toFixed(2)),
  CEN: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 3)],
  practice: ['ecole', 'cross', 'hikeNfly', 'acro', 'comp'][Math.floor(Math.random() * 3)],
  ratio: Math.floor(Math.random() * 4 + 8),
}));

fs.writeFile(`${process.cwd()}/seeds/data/brand.json`, JSON.stringify(brands, null, 4), {}, (e) => {
  if (e) {
    // eslint-disable-next-line no-console
    console.error(`An error occured. Are you on the upflow-test folder ? ${e}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('brands generation done !');
  }
});

fs.writeFile(`${process.cwd()}/seeds/data/brand_model.json`, JSON.stringify(objects, null, 4), {}, (e) => {
  if (e) {
    // eslint-disable-next-line no-console
    console.error(`An error occured. Are you on the upflow-test folder ? ${e}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('brands models generation done !');
  }
});
