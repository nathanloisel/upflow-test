const brandModel = require('./data/brand_model.json');

exports.seed = (knex) => knex.batchInsert('brand_model', brandModel);
