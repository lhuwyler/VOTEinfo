const sortJsonArray = require('sort-json-array')
const nano = require('nano')('http://admin:password@localhost:5984')


const votes = nano.db.use('votes');
const cantons = nano.db.use('cantons');

let functions = {}

// Get results on federal level for all votes
functions.getVotes = function(callback) {
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
    },
    limit: 100
  }
  votes.find(q).then((docs) => {
    callback(docs.docs)
  });
}

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
  });
}

// Get results on cantonal level for a vote
functions.getCantonsByVote = function(name, callback) {
  votes.view('votes', 'votes', {
    'key': name,
    'include_docs': true
  }).then((body) => {
    let cantons = []
    body.rows.forEach((row) => {
      cantons.push(row.doc)
    })
    callback(cantons)
  })
}

// Get al ist of all Cantons
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

module.exports = functions
