const sortJsonArray = require('sort-json-array')
const nano = require('nano')('http://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT)
const votes = nano.db.use('votes');
const cantons = nano.db.use('cantons');
const municipalities = nano.db.use('votes_municipalities');

let functions = {}

// Get a vote by it's id
functions.getVoteById = function(id, callback) {
  municipalities.get(id).then((body) => {
    callback(body)
  })
}

// Get a federal vote by its name
functions.getVoteByName = function(name, date, callback) {
  municipalities.view('CHvote', 'votes_federalLevel', {
    key: name + date,
    include_docs: true
  }).then((body) => {
    callback(body.rows[0].doc)
  })
}

// Get All votes on federal level
functions.getAllVotes = function(callback) {
  municipalities.view('CHvote', 'countries', {
    key: 'Switzerland',
    include_docs: true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

// Get results on federal level for all votes in a given year
functions.getVotesByYear = function(year, callback) {
  municipalities.view('CHvote', 'years', {
    key: year,
    include_docs: true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

// Get results from all cantons for a vote
functions.getCantonsByVote = function(name, date, callback) {
  municipalities.view('CHvote', 'votes_cantonLevel', {
    key: name + date,
    include_docs: true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

// Get a list of all Cantons
functions.getCantons = function(callback) {
  municipalities.view('CHvote', 'cantons_reduced', {}).then((body) => {
    let cantons = []
    body.rows.forEach((row) => {
      cantons.push(row.key)
    })
    callback(cantons)
  })
}

// Get a list of all Municipalities
functions.getMunicipalities = function(callback) {
  municipalities.view('CHvote', 'municipalities_reduced', {}).then((body) => {
    let municipalities = []
    body.rows.forEach((row) => {
      municipalities.push(row.key)
    })
    callback(municipalities)
  })
}

// Returns all votes for a Canton
functions.getVotesByCanton = function(canton, callback) {
  municipalities.view('CHvote', 'cantons', {
    key: canton,
    include_docs: true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

// Returns all votes for a Municipality
functions.getVotesByMunicipality = function(municipality, callback) {
  municipalities.view('CHvote', 'municipalities', {
    key: municipality,
    include_docs: true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

// Get average voter turnout
functions.getAvgVoterTurnout = function(regionType, regionName, callback){
  callback(0)
}

module.exports = functions
