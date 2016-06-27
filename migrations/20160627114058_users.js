exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('googleId');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.boolean('permission');
    table.date('birthday');
    table.integer('diagnosis_id').references('diagnosis.id');
    table.integer('medicine_id').references('medicine.id');
    table.string('telephone');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
