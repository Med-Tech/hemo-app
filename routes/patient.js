var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');
var twilio = require('../twilio');
require('dotenv').load();
var splice = require('string-splice');

// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
  db.findUserById(request.user.id).then(function(user) {
    db.findBleedIncident(user.user_id).then(function(bleed) {
      // Format each bleed event date
      bleed.forEach(function(bleedEventObj) {
        var string = bleedEventObj.event_date.toString();
        bleedEventObj.event_date = splice(string, 16, 24);
      });
      response.render('patient', { dbUser: user,
                                   googleUser: request.user,
                                   bleed: bleed
                                 });
    });
  });
});

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

// POST to /delete for patients to delete their bleed event
router.post('/delete', function(request, response, next) {
  db.deleteBleedEvent(request.body.bleed_id).then(function() {
    response.redirect('/patient');
  });
});

// POST to patient/edit for editing blood events
router.post('/edit', function(request, response, next) {
  db.editBleedEvent(request.body).then(function() {
    response.redirect('/patient');
  });
});



module.exports = router;
