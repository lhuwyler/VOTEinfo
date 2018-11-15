const express = require('express')

let router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index.html', {
    page: 'home',
  });
});

module.exports = router
