exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, first_name: 'Nathan', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', permission: true, birthday: '1987-10-11', diagnosis_id: 1, medicine_id: 2, telephone: '515-229-1737', address: '2938 Vallejo St, Denver, CO 80211'}),
        knex('users').insert({id: 2, first_name: 'Steven', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', permission: false, birthday: '1987-10-11', diagnosis_id: 2, medicine_id: 4, telephone: '515-229-1737', address: '2938 Vallejo St, Denver, CO 80211'}),
        knex('users').insert({id: 3, first_name: 'Elaine', last_name: 'Ostiguy', email: 'peterjostiguy@gmail.com', permission: true, birthday: '1987-10-11', diagnosis_id: 4, medicine_id: 5, telephone: '515-229-1737', address: '2938 Vallejo St, Denver, CO 80211'})
      ]);
    });
};
