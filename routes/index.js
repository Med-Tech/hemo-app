var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


// GET root page
router.get('/', auth.ifLoggedInCantGoHome, function(request, response, next) {
  response.render('index', { user: request.user });
});

// GET profile page to fill out other data
router.get('/profile', auth.ensureAuthenticated, function(request, response, next) {
  response.render('profile', { user: request.user });
});

// GET route for when you click on get started - passport authenticates through google
router.get('/auth/google',
  auth.passport.authenticate('google', { scope: ['openid email profile'] }));

// If successful auth - redirects to home page, if not - redirects to '/'
router.get('/auth/google/callback',
  auth.passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(request, response) {
    // Authenticated successfully
    db.findUserByUserId(request.user).then(function(user) {
      if (user[0].permission === null) {
        response.redirect('/profile');
      } else if (user[0].permission === true){
        response.redirect('/nurse');
      } else if (user[0].permission === false) {
        response.redirect('/patient');
      }
    });
  });

// POST to addtional information profile page
router.post('/profile', auth.ensureAuthenticated, function(request, response, next) {
  db.insertAdditionalInfo(request.body).then(function() {
    if (request.body.permission === 'true') {
      response.redirect('/nurse');
    } else {
      response.redirect('/patient');
    }
  });
});

// GET logout route - will sign person out of session
router.get('/logout', function(request, response) {
  request.logout();
  response.redirect('/');
});


module.exports = router;
