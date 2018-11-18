## USE PYTHON 3

import csv
import json
from collections import OrderedDict
import requests

csvFile = csv.DictReader(open('./kantone_1866.csv', encoding='utf-8'), delimiter=',')

currentCanton = ""

for row in csvFile:

    if(row["Kanton"]):
        currentCanton = row["Kanton"]
    if(row["Kanton"] == "Schweiz"):
        currentCanton = ""

    # Seperate date from name
    date = row["Name"].split(" ", 1)[0]
    name = row["Name"].split(" ", 1)[1]

    jsonFile = {
        "country": "Schweiz",
        "canton": currentCanton,
        "district": "",
        "municipality": "",
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
        "http://127.0.0.1:5984/votes",
        json=jsonFile,
        auth=('admin', 'password')
    )
