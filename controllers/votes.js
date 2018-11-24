const express = require('express')
const db = require('../models/db')
const sortJsonArray = require('sort-json-array')

let router = express.Router()

router.get('/', function(req, res, next) {
  // Get Year to show. If no year, use 2017
  let year = '2018'
  if (req.query.y){
    year = req.query.y
  }
  // Get all votes held in the given year
  db.getVotesByYear(year, function(votes){
    res.render('votes.html', {
      page: 'votes',
      votes: votes,
      year: year
    });
  })
});

router.get('/:date/:name/', function(req, res, next) {
  // Get the vote the user clicked on
  db.getVoteByName(req.params.name, req.params.date, function(vote){
    // Get results from all cantons for that vote
    db.getCantonsByVote(vote.vote, vote.date, function(cantons){
      // Calculate Majority of the Cantons
      let cantonVote = 0
      // Cantons which only have half a vote
      let halfCantons = [
        "Obwalden",
        "Nidwalden",
        "BaselStadt",
        "BaselLandschaft",
        "Appenzell Innerrhoden",
        "Appenzell Ausserrhoden"
      ]
      // Cast a vote for every canton that said yes (or 0.5 for every half canton)
      cantons.forEach(function(canton){
        if (parseInt(canton.votesYes) > parseInt(canton.votesNo)){
          cantonVote = cantonVote + 1.0
          if (halfCantons.includes(canton.canton)){
            cantonVote = cantonVote - 0.5
          }
        }
      });
      res.render('vote.html', {
        page: 'votes',
        vote: vote,
        cantonVote: cantonVote,
        cantons: sortJsonArray(cantons.slice(), "canton"),
        ranking: sortJsonArray(cantons.slice(), "votesYesPercent", "des")
      });
    })
  })
});


module.exports = router
