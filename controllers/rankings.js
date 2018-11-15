const express = require('express')

let router = express.Router()

router.get('/', function(req, res, next) {
  res.render('rankings.html', {
    page: 'rankings',
  });
});

module.exports = router
