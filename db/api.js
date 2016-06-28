var knex = require('./knex');

module.exports = {

  findUserById: function(profileId) {
    return knex('users').select(['users.id as user_id', 'medicine.name as medicine', 'diagnosis.name as diagnosis', '*'])
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
  },

  insertBleedEvent: function(body) {
    return knex('bleed')
      .insert({ event_date: body.event_date,
                description: body.description,
                physical_location: body.physical_location,
                medicine_id: body.medicine,
                dose: body.dose,
                prioritize: body.prioritize,
                action_needed: body.action_needed,
                users_id: body.users_id
              });
  },

  findBleedIncident: function(user_id) {
    return knex('bleed').select().where({ users_id: user_id });
  },

  findAllBleedIncidents: function() {
    return knex('bleed').select()
      .join('users', 'bleed.users_id', 'users.id');
  }

};
