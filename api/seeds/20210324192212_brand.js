const brand = require('./data/brand.json');

exports.seed = (knex) => knex.batchInsert('brand', brand);
