var knex = require('./knex');

module.exports = {

  findUserById: function(profileId) {
    return knex('users').select().where({ googleId: profileId }).first();
  },

  createUser: function(profile) {
    return knex('users').insert({ googleId: profile.id,
                                  first_name: profile.name.givenName,
                                  last_name: profile.name.familyName,
                                  email: profile.emails[0].value
                                });
  }

};
