const express = require('express')
const db = require('../models/db')
const sortJsonArray = require('sort-json-array')

let router = express.Router()

router.get('/', function(req, res, next) {
  let year = 2017
  if (req.query.y){
    year = req.query.y
  }

  db.getVotesByYear(year, function(votes){
    res.render('votes.html', {
      page: 'votes',
      votes: votes,
      year: year
    });
  })
});

router.get('/:id', function(req, res, next) {
  db.getVoteById(req.params.id, function(vote){
    db.getCantonsByVote(vote.vote, function(cantons){
      res.render('vote.html', {
        page: 'votes',
        vote: vote,
        cantons: sortJsonArray(cantons.slice(), "canton"),
        ranking: sortJsonArray(cantons.slice(), "votesYesPercent", "des")
      });
      console.log(sortJsonArray(cantons.slice(), "canton"))
    })
  })
});


module.exports = router
