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
  db.getAvgVoterTurnout(req.params.municipality, function(avgTurnout){
    db.getVotesByMunicipality(req.params.municipality, function(votes){
      res.render('region.html', {
        page: 'regions',
        name: req.params.municipality,
        avgTurnout: avgTurnout,
        votes: votes
      })
    })
  })
})

router.get('/canton/:canton', function(req, res, next) {
  db.getAvgVoterTurnout(req.params.canton, function(avgTurnout){
    db.getVotesByCanton(req.params.canton, function(votes){
      res.render('region.html', {
        page: 'regions',
        name: req.params.canton,
        avgTurnout: avgTurnout,
        votes: votes
      })
    })
  })
})

router.get('/switzerland', function(req, res, next) {
  db.getAvgVoterTurnout('Schweiz', function(avgTurnout){
    db.getAllVotes(function(votes){
      res.render('region.html', {
        page: 'regions',
        name: 'Schweiz',
        avgTurnout: avgTurnout,
        votes: votes
      })
    })
  })
})

module.exports = router
