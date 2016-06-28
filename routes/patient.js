var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, auth.isPatient, function(request, response, next) {
  db.findUserById(request.user.id).then(function(user) {
    response.render('patient', { dbUser: user,
                                 googleUser: request.user
                               });
  });
});


// POST to /create route to add bleed event
router.post('/create', function(request, response, next) {
  console.log(request.body);
  db.insertBleedEvent(request.body).then(function() {
    response.redirect('/');
  });
});

module.exports = router;
