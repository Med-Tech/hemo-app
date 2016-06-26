var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


// GET root page
router.get('/', function(request, response) {
  response.render('index', { user: request.user });
});

// GET login page
router.get('/login', function(request, response) {
  response.render('login', { user: request.user });
});

// GET home page, must be authenticated to view
router.get('/home', auth.ensureAuthenticated, function(request, response, next) {
  response.render('home', { user: request.user });
});

// GET profile page to fill out other data
router.get('/profile', auth.ensureAuthenticated, function(request, response, next) {
  response.render('profile', { user: request.user });
});


// GET route for when you click on login - passport authenticates through google
router.get('/auth/google',
  auth.passport.authenticate('google', { scope: ['openid email profile'] }));

// If successful auth - redirects to home page, if not - redirects to /login
router.get('/auth/google/callback',
  auth.passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(request, response) {
    // Authenticated successfully
    db.findUserByUserId(request.user).then(function(user) {
      if (user[0].permission === null) {
        response.redirect('/profile');
      } else {
        response.redirect('/home');
      }
    });
  });


router.post('/profile', auth.ensureAuthenticated, function(request, response, next) {
  db.insertAdditionalInfo(request.body).then(function() {
    response.redirect('/home');
  });
});

// GET logout route - will sign person out of session
router.get('/logout', function(request, response) {
  request.logout();
  response.redirect('/');
});


module.exports = router;
