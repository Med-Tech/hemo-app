exports.seed = function(knex, Promise) {
  return knex('medicine').del()
    .then(function () {
      return Promise.all([
        knex('medicine').insert({id: 1, name: 'Stimate'}),
        knex('medicine').insert({id: 2, name: 'Amicar'}),
        knex('medicine').insert({id: 3, name: 'Advate'}),
        knex('medicine').insert({id: 4, name: 'Rixubus'}),
        knex('medicine').insert({id: 5, name: 'Elcotate'})
      ]);
    });
};
