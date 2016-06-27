
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bleed', function(table){
    table.increments();
    table.integer('users_id').references('users.id');
    table.timestamp('timestamp');
    table.date('event_date');
    table.string('description');
    table.string('physical_location');
    table.integer('medicine_id').references('medicine.id');
    table.integer('dose');
    table.boolean('prioritize');
    table.boolean('action_needed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bleed');
};
