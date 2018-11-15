const express = require('express')

let router = express.Router()

router.get('/', function(req, res, next) {
  res.render('about.html', {
    page: 'about',
  });
});

module.exports = router
