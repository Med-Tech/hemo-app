var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


// GET patient home page, must be authenticated to view
router.get('/', auth.ensureAuthenticated, function(request, response, next) {
  db.findUserById(request.user.id).then(function(user) {
    response.render('patient', { dbUser: user,
                                 googleUser: request.user
                               });
  });
});


module.exports = router;
