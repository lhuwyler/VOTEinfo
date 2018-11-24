# How To Prepare CouchDB

```json
{
  "_id": "_design/CHvote",
  "_rev": "19-37de8bbba96dbfc128a82d6af2696849",
  "views": {
    "cantons": {
      "map": "function (doc) {
        if(doc.canton && !doc.district && !doc.municipality){
          emit(doc.canton, null);
        }
      }"
    },
    "years": {
      "map": "function (doc) {
        if (!doc.canton && !doc.district && !doc.municipality){
          var year = doc.date.substring(0, 4)
          emit(year, null);
        }
      }"
    },
    "municipalities": {
      "map": "function (doc) {
        if(doc.municipality){
          emit(doc.municipality, null);
        }
      }"
    },
    "cantons_reduced": {
      "map": "function (doc) {
        if(doc.canton && !doc.district && !doc.municipality && doc.vote == \"Bundesgesetz über den Nachrichtendienst (Nachrichtendienstgesetz, NDG)\"){
          emit(doc.canton, null)
        }
      }"
    },
    "municipalities_reduced": {
      "map": "function (doc) {
        if(doc.municipality && doc.vote == \"Bundesgesetz über den Nachrichtendienst (Nachrichtendienstgesetz, NDG)\"){
          emit(doc.municipality, null)
        }
      }"
    },
    "votes_cantonLevel": {
      "map": "function (doc) {
        if(doc.canton && !doc.district && !doc.municipality){
          emit(doc.vote+doc.date, null)
        }
      }"
    },
    "countries": {
      "map": "function (doc) {
        if(!doc.canton && !doc.district && !doc.municipality){
          emit('Switzerland', null);
        }
      }"
    }
  },
  "language": "javascript"
}
```
