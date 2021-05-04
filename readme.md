# Abenteuer [loot]
Abenteuer, auf dem die Zuschauer Gegenstände finden, stehlen und handeln können.

## Befehle
Befehl | Beschreibung
------ | ------------
**!loot** | Der Zuschauer, das das eingibt, nimmt am Abenteuer teil.
**!inventory** | Zeigt alle Gegenstände des Zuschauers an, der den Befehl eingibt. Es wird der Name und die Nummer zum Handeln angezeigt.
**!lootstart** | Startet das Modul.
**!lootstop** | Beendet das Modul.
**!lootclear** | Bereinigt das Modul vollständig.
**!steal** | Stiehlt einen zufällen Zuschauer ein Gegenstand und gibt es den, der den Befehl eingibt. 10%ige Chance auf Fehlschlag.
**!steal:iten @spieler** | Stiehlt dem angegebenen Zuschauer den genannten Gegenstand und gibt es den, der den Befehl eingibt. 50%ige Chance auf Fehlschlag.
**!give:item @spieler** | Der Zuschauer, der den Befehl eingibt, gibt einen anderen Zuschauer ein Item aus dem Inventar. Es muss die Itemnummer aus dem Inventar und ein Zuschauer als Ziel eingegeben werden, der am Abenteuer teilnimmt.

## Einstellungsmöglichkeiten
- Zeit in Minuten, wie oft ein Item zufällig vergeben werden soll.



# Streamer und Mods [support]
Modul zur automatischen anzeige der Streamer und Mods.

## Befehle
Befehl | Beschreibung
------ | ------------
**!support** | Zeigt alle Streamer und Mods an.
**!supportstart** | Startet das Modul.
**!supportstop** | Beendet das Modul.
**!supportclear** | Bereinigt das Modul vollständig.

## Einstellungsmöglichkeiten:
- Zeit in Minuten, wie oft die Streamer und Mods im Chat angezeigt weden soll.
- Namen der Mods
- Namen der Streamer



# Hilfe [help]
Modul zur automatischen Verwaltung von Hilfenachrichten. Zeigt nur die Hilfetexte von den Modulen an, die aktiv sind.

## Befehle
Befehl | Beschreibung
------ | ------------
**!help** | Zeigt alle Hilfetexte der aktiven Module an.
**!helpstart** | Startet das Modul.
**!helpstop** | Beendet das Modul.
**!helpclear** | Bereinigt das Modul vollständig.

## Einstellungsmöglichkeiten:
- Zeit in Minuten, wie oft die Hilfe im Chat angezeigt weden soll.
- Alle Hilfetexte



# Spenden [donate]
Modul für Spendenstreams. Jeder Zuschauer kann einmal pro Stream 1€ spenden. Das Geld muss vom Streamer bezahlt werden, kein Payment von Zuschauern. Ist super für Creators, die Affiliate werden möchten.

## Befehle
Befehl | Beschreibung
------ | ------------
**!donate** | Spende wird um 1€ erhöht. Benutzer wird gespeichert, sodass jeder nur einmal spenden kann.
**!donatemax** | Spendenlimit kann während des Streams geändert werden.
**!donatestart** | Startet das Modul.
**!donatestop** | Beendet das Modul.
**!donateclear** | Bereinigt das Modul vollständig.

## Einstellungsmöglichkeiten
- Zeit in Minuten, wie die Spendenaktion im Chat angezeigt weden soll.
- Spendenziel, Organisation 



# Streamingzeit [time]
Zeigt im Chat die Streamingzeit an.

## Befehle
**!time** | Zeigt die aktuelle Streamingdauer an.
**!timestart** | Startet das Modul.
**!timestop** | Beendet das Modul.
**!timeclear** | Setzt die aktuelle Streamingdauer auf 0 zurück.



# Keys versckenken [key] 
Zeigt Key-Codes im Chat an, um die sich die Zuschauer streiten dürfen.

## Einstellungsmöglichkeiten
- Zeit in Minuten, wie oft ein Key im Chat rausgehauen weden soll.
- Alle Keys (wird niemals über den Chat gehen :D)



# Administration [administration]
Administrationstools. Dient aktuell dazu, alle aktiven Module zu starten / stoppen, damit der Chat nicht zugemüllt wird, wenn der Stream vorüber ist.

## Befehle
Befehl | Beschreibung
------ | ------------
**!adminstart** | Startet alle aktiven Module.
**!adminstop** | Beendet alle aktiven Module.
