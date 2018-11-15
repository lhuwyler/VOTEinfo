const express = require('express')

let router = express.Router()

router.get('/', function(req, res, next) {
  res.render('regions.html', {
    page: 'regions',
  });
});

module.exports = router
