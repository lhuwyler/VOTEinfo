# How To Prepare CouchDB

## Create database
1. In CouchDB die Datenbank __votes_municipalities__ erstellen.

## Upload JSON data
1. In den untersten Zeilen von __upload_municipalities.py__ die Zugansdaten und den Hostname für die Datenbank eintragen.
2. Script ausführen und auf Beendigung warten ``python3 upload_municipalities.py``

Die Anderen beiden Scripts / Datenquellen wurden im Verlauf des Projekts obsolet und werden nicht mehr verwendet.

## Create views
Für eine schnelle Ausgabe der JSON-Documents wird für die meisten Abfragen eine view verwendet.

Für die DB __votes_municipalities__ die folgendes Design-Document erstellen und auf Beendigung des Indexings warten:

```json
{
  "_id": "_design/CHvote",
  "views": {
    "cantons": {
      "map": "function (doc) {\n  if(doc.canton && !doc.district && !doc.municipality){\n    emit(doc.canton, null);\n  }\n}"
    },
    "years": {
      "map": "function (doc) {\n  if (!doc.canton && !doc.district && !doc.municipality){\n    var year = doc.date.substring(0, 4)\n    emit(year, null);\n  }\n}"
    },
    "municipalities": {
      "map": "function (doc) {\n  if(doc.municipality){\n    emit(doc.municipality, null);\n  }\n}"
    },
    "cantons_reduced": {
      "map": "function (doc) {\n  if(doc.canton && !doc.district && !doc.municipality && doc.vote == \"Bundesgesetz über den Nachrichtendienst (Nachrichtendienstgesetz, NDG)\"){\n    emit(doc.canton, null)\n  }\n}"
    },
    "municipalities_reduced": {
      "map": "function (doc) {\n  if(doc.municipality && doc.vote == \"Bundesgesetz über den Nachrichtendienst (Nachrichtendienstgesetz, NDG)\"){\n    emit(doc.municipality, null)\n  }\n}"
    },
    "votes_cantonLevel": {
      "map": "function (doc) {\n  if(doc.canton && !doc.district && !doc.municipality){\n    emit(doc.vote+doc.date, null)\n  }\n}"
    },
    "countries": {
      "map": "function (doc) {\n  if(!doc.canton && !doc.district && !doc.municipality){\n    emit('Switzerland', null);\n  }\n}"
    },
    "votes_federalLevel": {
      "map": "function (doc) {\n  if(!doc.canton && !doc.district && !doc.municipality){\n    emit(doc.vote+doc.date, null)\n  }\n}"
    }
  },
  "language": "javascript"
}
```
