
exports.seed = function(knex, Promise) {
  return knex('bleed').del();
  return knex('users').del();
  return knex('medicine').del();
  return knex('diagnosis').del();
};
