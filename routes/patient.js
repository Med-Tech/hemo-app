var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');
var twilio = require('../twilio');
require('dotenv').load();
var splice = require('string-splice');

// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
    db.findUserById(request.user.id)
  .then(function(user) {
    db.findBleedIncident(user.user_id)
  .then(function(bleed) {
    db.formatBleedDate(bleed);
    // Format birthday
    user.birthday = splice(user.birthday.toString(), 16, 24);
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
    var urgent = 'An urgent message has been posted! Please reply immediately.';
    var non_urgent = 'A non-urgent message has been posted. Please reply soon.';
      if (request.body.prioritize === 'true') {
        twilio.sendMessage('5152291737', urgent);
        twilio.sendMessage('4843547333', urgent);
        twilio.sendMessage('3035478715', urgent);
        twilio.sendMessage('9252853344', urgent);
        // twilio.sendMessage('6157147175', urgent);
        // twilio.sendMessage('3035976996', urgent);
        // twilio.sendMessage('8172287173', urgent);
        // twilio.sendMessage('7203454678', urgent);
        // twilio.sendMessage('7205395828', urgent);
        // twilio.sendMessage('3037209905', urgent);
      } else {
        twilio.sendMessage('5152291737', non_urgent);
        twilio.sendMessage('4843547333', non_urgent);
        twilio.sendMessage('3035478715', non_urgent);
        twilio.sendMessage('9252853344', non_urgent);
        // twilio.sendMessage('6157147175', non_urgent);
        // twilio.sendMessage('3035976996', non_urgent);
        // twilio.sendMessage('8172287173', non_urgent);
        // twilio.sendMessage('7203454678', non_urgent);
        // twilio.sendMessage('7205395828', non_urgent);
        // twilio.sendMessage('3037209905', non_urgent);
      }
    });
  response.redirect('/patient');
});

// POST to /delete for patients to delete their bleed event
router.post('/delete', auth.ensureAuthenticated, function(request, response, next) {
  db.deleteBleedEvent(request.body.bleed_id).then(function() {
    response.redirect('/patient');
  });
});

// POST to patient/edit for editing blood events
router.post('/edit', auth.ensureAuthenticated, function(request, response, next) {
  db.editBleedEvent(request.body).then(function() {
    response.redirect('/patient');
  });
});


module.exports = router;
