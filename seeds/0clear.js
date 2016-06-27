exports.seed = function(knex, Promise) {
      return knex('bleed').del()
    .then(function() {
      return knex('users').del();
    }).then(function() {
      return knex('medicine').del();
    }).then(function() {
      return knex('diagnosis').del();
    });
};
