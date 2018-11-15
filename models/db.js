const sortJsonArray = require('sort-json-array')
const nano = require('nano')('http://admin:password@localhost:5984')


const votes = nano.db.use('votes');

let functions = {}

// Get results on federal level for all votes
functions.getVotes = function(callback){
  let q = {
    selector: {
      canton: { "$eq": ""},
      district: { "$eq": ""},
      municipality: { "$eq": ""},
    },
    limit:100
  }
  votes.find(q).then((docs) => {
    callback(docs.docs)
  });
}

// Get results on federal level for all votes by year
functions.getVotesByYear = function(year, callback){
  let q = {
    selector: {
      canton: { "$eq": ""},
      district: { "$eq": ""},
      municipality: { "$eq": ""},
      date: { "$regex": (year + "$")}
    },
    limit:1000
  }
  votes.find(q).then((docs) => {
    callback(docs.docs)
  });
}

// Get a vote by it's id
functions.getVoteById = function(id, callback){
  let q = {
    selector: {
      _id: { "$eq": id},
    },
    limit:1
  }
  votes.find(q).then((docs) => {
    callback(docs.docs[0])
  });
}

// Get results on cantonal level for a vote
functions.getCantonsByVote = function(name, callback){
  let q = {
    selector: {
      canton: { "$ne": ""},
      district: { "$eq": ""},
      municipality: { "$eq": ""},
      vote: { "$eq": name}
    },
    limit:100
  }
  votes.find(q).then((docs) => {
    callback(docs.docs)
  });
}

module.exports = functions
