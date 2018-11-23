const sortJsonArray = require('sort-json-array')
const nano = require('nano')('http://admin:password@localhost:5984')


const votes = nano.db.use('votes');
const cantons = nano.db.use('cantons');
const municipalities = nano.db.use('votes_municipalities');

let functions = {}

// Get results on federal level for all votes in a given year
functions.getVotesByYear = function(year, callback) {
  let q = {
    selector: {
      canton: {
        "$eq": ""
      },
      district: {
        "$eq": ""
      },
      municipality: {
        "$eq": ""
      },
      date: {
        "$regex": (year + "$")
      }
    },
    limit: 1000
  }
  votes.find(q).then((docs) => {
    callback(docs.docs)
  });
}

// Get a vote by it's id
functions.getVoteById = function(id, callback) {
  votes.get(id).then((body) => {
    callback(body)
  })
}

// Get results from all cantons for a vote
functions.getCantonsByVote = function(name, year, callback) {
  votes.view('votes', 'votes', {
    'key': name + year,
    'include_docs': true
  }).then((body) => {
    let cantons = []
    body.rows.forEach((row) => {
      cantons.push(row.doc)
    })
    callback(cantons)
  })
}

// Get a list of all Cantons
functions.getCantonList = function(callback) {
  votes.view('cantons', 'cantons', {
    group: true
  }).then((body) => {
    let cantons = []
    body.rows.forEach((row) => {
      cantons.push(row.key)
    })
    callback(cantons)
  })
}

// Get a list of all Municipalities
functions.getMunicipalities = function(callback) {
  municipalities.view('municipalities', 'municipalities_reduced', {}).then((body) => {
    let municipalities = []
    body.rows.forEach((row) => {
      municipalities.push(row.key)
    })
    callback(municipalities)
  })
}

// Returns all votes for a Municipality
functions.getVotesByMunicipality = function(municipality, callback){
  municipalities.view('municipalities', 'municipalities', {
    'key': municipality,
    'include_docs': true
  }).then((body) => {
    let votes = []
    body.rows.forEach((row) => {
      votes.push(row.doc)
    })
    callback(votes)
  })
}

module.exports = functions
