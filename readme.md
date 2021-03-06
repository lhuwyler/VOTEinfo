# VOTEinfo
So stimmt die Schweiz.

VOTEinfo ist eine Online-Plattform, die alle Daten über Schweizer Abstimmungen kompakt zusammenfasst und präsentiert.

https://voteinfo.ch

![VOTEinfo Start Screen](assets/images/voteinfo_screenshot.png "VOTEinfo Start Screen")

## Requirements
- NodeJS (Version 10.13.0 LTS)
- NPM (Kommt idR mit NodeJS)
- SASS (falls CSS Änderungen getätigt werden)

## Setup
Zum lokalen starten von VOTEinfo und Verbinden mit einer bestehenden Datenbank:
```bash
# Projekt Clonen
git clone https://github.com/lhuwyler/VOTEinfo.git
# Zum Projektverzeichnis wechseln
cd VOTEinfo
# Dependencies installieren
npm install
# Config File (dotenv) aus Vorlage erstellen
cp .env.example .env
# Datenbank-Optionen in Config-File setzen
nano .env
# Falls noch nicht vorhanden: nodemon installieren
npm -g install nodemon
# App starten
nodemon index.js
# VOTEinfo läuft nun unter localhost:3000
```

## Build
NodeJS "kompilliert" direkt bei der Ausführung. Vorgängig kompilliert werden müssen nur __Änderungen in CSS__:

```bash
# Falls noch nicht vorhanden: SASS installieren
npm -g install sass
# Zum CSS Verzeichnis wechseln
cd assets/css
# SASS compiler starten
sass --watch style.scss:style.css
# SASS wartet nun auf änderungen und kompilliert
# automatisch neu, sobald ein File geändert wird
```

## Projektstruktur
Folgende Elemente finden sich im Projektordner:

#### assets
Alle public files für die Website (css, javascript, bilder)

#### controllers
Request handlers für die einzelnen URLs. Sie holen die Daten aus dem Model und geben sie an die View weiter. Pro Stamm-URL existiert ein controller (Bsp: /votes, /regions, /about)

#### models
Holt die Daten aus der CouchDB und bereitet sie für die Verwendung auf. Enthält die "Business-Logic".

#### views
Enthält HTML Dateien für die Ausgabe als Website. Daten werden per __twig__ abgefüllt.

#### data_source
Enthält die Stammdaten vom Bundesamt für Statistik und die Python Scripts, um die Daten aufzubereiten und in die CouchDB hochzuladen.

#### docker-compose.yml
Docker-Compose file für lokale Entwicklungsumgebung (startet lokalen CouchDB server)

#### index.js
Einstiegspunkt für die VOTEinfo App. Definiert und startet den Webserver, lädt die Controller und matched diese zu ihren Stamm-URLs (Routes).

#### package.json
Projekt- & Dependency-Definition für NPM. Gleich wie pom.xml, nur ohne Kopfschmerzen.
