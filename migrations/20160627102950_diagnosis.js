
exports.up = function(knex, Promise) {
  return knex.schema.createTable('diagnosis', function(table){
    table.increments();
    table.text('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('diagnosis');
};
