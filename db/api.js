var knex = require('./knex');

module.exports = {

  findUserById: function(profileId) {
    return knex('users').select(['medicine.name as medicine', 'diagnosis.name as diagnosis', '*'])
      .where({ googleId: profileId }).first()
        .join('medicine', 'medicine_id', 'medicine.id')
        .join('diagnosis', 'diagnosis_id', 'diagnosis.id');
  },

  createUser: function(profile) {
    return knex('users')
      .insert({ googleId: profile.id,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                email: profile.emails[0].value
              });
  },

  findUserByUserId: function(user) {
    return knex('users').select().where({ googleId: user.id });
  },

  insertAdditionalInfo: function(body) {
    return knex('users')
      .where({ googleId: body.userId })
        .update({ permission: body.permission,
                  birthday: body.birthday,
                  diagnosis_id: body.diagnosis,
                  medicine_id: body.medicine,
                  telephone: body.telephone.replace(/[^0-9]/g, "")
                });
  }

};
