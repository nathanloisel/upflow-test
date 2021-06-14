exports.up = async (knex) => {
  await knex.schema.createTable('brand_model', (table) => {
    table.uuid('name').defaultTo(knex.raw('gen_random_uuid()'));
    table.string('brand');
    table.float('allon');
    table.enu('CEN', ['A', 'B', 'C', 'D'], { useNative: true, enumName: 'cen_type' });
    table.enu('practice', ['ecole', 'cross', 'hikeNfly', 'acro', 'comp'], { useNative: true, enumName: 'practice_type' });
    table.integer('ratio');
    table.primary(['name', 'brand']);
    table.foreign('brand').references('brand.name');
  });
};
exports.down = async (knex) => {
  await knex.schema.dropTable('brand_model');
};
