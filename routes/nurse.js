var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isNurse, function(request, response, next) {
  db.findUserById(request.user.id).then(function(user) {
    db.findAllBleedIncidents().then(function(bleed) {
      response.render('nurse', { dbUser: user,
                                 googleUser: request.user,
                                 bleed: bleed
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
