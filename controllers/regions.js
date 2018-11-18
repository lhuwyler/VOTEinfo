const express = require('express')
const db = require('../models/db')

let router = express.Router()

router.get('/', function(req, res, next) {
  db.getCantonList(function(cantons){
    res.render('regions.html', {
      page: 'regions',
      cantons: cantons
    })
  })
});

module.exports = router
