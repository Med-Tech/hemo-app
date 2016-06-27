var express = require('express');
var router = express.Router();
var auth = require('../auth');
var db = require('../db/api');


router.get('/', function(request, response, next) {
  response.render('patient');
});


module.exports = router;
