exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('googleId');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.boolean('permission');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
