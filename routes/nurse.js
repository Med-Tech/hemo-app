var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');
var splice = require('string-splice');



// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isNurse, function(request, response, next) {
    db.findUserById(request.user.id)
  .then(function(user) {
    db.findAllBleedIncidents()
  .then(function(allBleed) {
    db.findAllBleedIncidentsActionTrue()
  .then(function(bleed) {
    // Format each bleed event date
    bleed.forEach(function(bleedEventObj) {
      var string = bleedEventObj.event_date.toString();
      bleedEventObj.event_date = splice(string, 16, 24);
    });
    allBleed.forEach(function(bleedEventObj) {
      var string = bleedEventObj.event_date.toString();
      bleedEventObj.event_date = splice(string, 16, 24);
    });
    response.render('nurse', { dbUser: user,
                               googleUser: request.user,
                               bleed: bleed,
                               allBleed: allBleed
                             });
      });
    });
  });
});

router.post('/', auth.ensureAuthenticated, auth.isNurse, function(request, response, next) {
  db.changeBleedIncidentStatus(request.body.event_id).then(function() {
    response.redirect('/nurse');
  });
});


module.exports = router;
