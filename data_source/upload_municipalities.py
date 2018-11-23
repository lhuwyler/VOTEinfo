## USE PYTHON 3

import csv
import json
from collections import OrderedDict
import requests

csvFile = csv.DictReader(open('./gemeinden_2001.csv', encoding='utf-8'), delimiter=';')

currentCanton = ""
currentDistrict = ""

i = 0

for row in csvFile:

    # Seperate date from name
    date = row["Datum und Vorlage"].split(" ", 1)[0]
    name = row["Datum und Vorlage"].split(" ", 1)[1]

    # Extract Location
    location = row["Kanton (-) / Bezirk (>>) / Gemeinde (......)"]
    municipality = ""

    if("Schweiz" in location):
        currentCanton = ""
        currentDistrict = ""
    if(location[0] == "-"):
        currentCanton = location.replace("-","")
        currentDistrict = ""
    if(">>" in location):
        currentDistrict = location.replace(">>","")
    if("......" in location):
        municipality = location.replace("......","")

    jsonFile = {
        "country": "Schweiz",
        "canton": currentCanton,
        "district": currentDistrict,
        "municipality": municipality,
        "date": date,
        "vote": name,
        "registeredVoters": row["Stimmberechtigte"],
        "votes": row["Abgegebene Stimmen"],
        "voterTurnOut": row["Beteiligung in %"],
        "votesValid": row["Gültige Stimmzettel"],
        "votesYes": row["Ja"],
        "votesNo": row["Nein"],
        "votesYesPercent": row["Ja in %"],
    }

    req = requests.post(
        "http://127.0.0.1:5984/votes_municipalities",
        json=jsonFile,
        auth=('admin', 'password')
    )
