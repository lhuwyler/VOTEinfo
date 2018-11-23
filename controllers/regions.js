const express = require('express')
const db = require('../models/db')

let router = express.Router()

router.get('/', function(req, res, next) {
  db.getCantonList(function(cantons){
    db.getMunicipalities(function(municipalities){
      res.render('regions.html', {
        page: 'regions',
        cantons: cantons,
        municipalities: municipalities
      })
    })
  })
});

module.exports = router
