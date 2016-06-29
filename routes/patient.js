var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');
var twilio = require('../twilio');
require('dotenv').load();


// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
  db.findUserById(request.user.id).then(function(user) {
    db.findBleedIncident(user.user_id).then(function(bleed) {
      response.render('patient', { dbUser: user,
                                   googleUser: request.user,
                                   bleed: bleed
                                 });
    });
  });
});

// *********Same results as above but remains ability to stay flat instaed of down a callback hell

// router.get('/', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
//   db.findUserById(request.user.id).then(function(user) {
//     return db.findBleedIncident(user.user_id).then(function (bleed) {
//       return { user: user, bleed: bleed };
//     });
//   }).then(function(data) {
//     response.render('patient', { dbUser: data.user,
//                                  googleUser: request.user,
//                                  bleed: data.bleed
//                                });
//   });
// });


// POST to /create route to add bleed event
router.post('/create', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
  db.insertBleedEvent(request.body).then(function() {
    if (request.body.prioritize === 'true') {
      twilio.sendMessage('5152291737', 'An urgent message has been posted! Please reply immediately.');
      twilio.sendMessage('4843547333', 'An urgent message has been posted! Please reply immediately.');
      twilio.sendMessage('3035478715', 'An urgent message has been posted! Please reply immediately.');
      twilio.sendMessage('9252853344', 'An urgent message has been posted! Please reply immediately.');
    } else {
      twilio.sendMessage('5152291737', 'A non-urgent message has been posted. Please reply soon.');
      twilio.sendMessage('4843547333', 'A non-urgent message has been posted. Please reply soon.');
      twilio.sendMessage('3035478715', 'A non-urgent message has been posted. Please reply soon.');
      twilio.sendMessage('9252853344', 'A non-urgent message has been posted. Please reply soon.');
    }
  });
  response.redirect('/patient');
});

module.exports = router;
