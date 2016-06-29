exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ googleId: 'q8948yggrwetwhtrrhur779sdf3', first_name: 'Nathan', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', photo_url: 'https://lh4.googleusercontent.com/-HHrKeXkpQFw/AAAAAAAAAAI/AAAAAAAAAFk/zQM3ZtEXxLw/photo.jpg?sz=50', permission: false, birthday: '1987-10-11', diagnosis_id: 1, medicine_id: 2, telephone: '515-229-1737' }),
        knex('users').insert({ googleId: 'ngldd74768yufhfhuw90202948j', first_name: 'Steven', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', permission: false, birthday: '1987-10-11', diagnosis_id: 2, medicine_id: 4, telephone: '515-229-1737' }),
        knex('users').insert({ googleId: 'mxvfhg90603815df8h95n45906n', first_name: 'Elaine', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', permission: false, birthday: '1987-10-11', diagnosis_id: 4, medicine_id: 5, telephone: '515-229-1737' })
      ]);
    });
};
