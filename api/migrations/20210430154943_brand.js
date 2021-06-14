exports.up = async (knex) => {
  await knex.schema.createTable('brand', (table) => {
    table.string('name');
    table.primary('name');
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('brand');
};
