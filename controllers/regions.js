const express = require('express')
const db = require('../models/db')

let router = express.Router()

router.get('/', function(req, res, next) {
  db.getCantons(function(cantons){
    db.getMunicipalities(function(municipalities){
      res.render('regions.html', {
        page: 'regions',
        cantons: cantons,
        municipalities: municipalities
      })
    })
  })
});

router.get('/municipality/:municipality', function(req, res, next) {
  db.getVotesByMunicipality(req.params.municipality, function(votes){
    res.render('region.html', {
      page: 'regions',
      name: req.params.municipality,
      votes: votes
    })
  })
})

router.get('/canton/:canton', function(req, res, next) {
  db.getVotesByCanton(req.params.canton, function(votes){
    res.render('region.html', {
      page: 'regions',
      name: req.params.canton,
      votes: votes
    })
  })
})

router.get('/switzerland', function(req, res, next) {
  db.getAllVotes(function(votes){
    res.render('region.html', {
      page: 'regions',
      name: 'Switzerland',
      votes: votes
    })
  })
})

module.exports = router
