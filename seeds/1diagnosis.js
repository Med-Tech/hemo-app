exports.seed = function(knex, Promise) {
  return knex('diagnosis').del()
    .then(function () {
      return Promise.all([
        knex('diagnosis').insert({id: 1, name: 'Hemophilia A'}),
        knex('diagnosis').insert({id: 2, name: 'Hemophilia B'}),
        knex('diagnosis').insert({id: 3, name: 'Von Willebrand'}),
        knex('diagnosis').insert({id: 4, name: 'Rare Bleeding Disorder'})
      ]);
    });
};
