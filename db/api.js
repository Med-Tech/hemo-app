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
  },

  findUserByUserId: function(user) {
    return knex('users').select().where({ googleId: user.id });
  },

  insertAdditionalInfo: function(body) {
    return knex('users').where({ googleId: body.userId }).update({ permission: body.permission });
  }

};
