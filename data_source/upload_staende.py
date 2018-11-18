## USE PYTHON 3

import csv
import json
from collections import OrderedDict
import requests

csvFile = csv.DictReader(open('./staende_stimmen.csv', encoding='utf-8'), delimiter=';')

for row in csvFile:
    print(row)
    jsonFile = {
        "short": row["Abk"],
        "canton": row["Kanton"],
        "cantonVotes": row["Stimmen"]
    }

    req = requests.post(
        "http://127.0.0.1:5984/cantons",
        json=jsonFile,
        auth=('admin', 'password')
    )
