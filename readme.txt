```**Modul**: 
    Abenteuer [loot]
Beschreibung:
    Abenteuer, auf dem die Zuschauer Gegenstände finden, stehlen und handeln können.
Befehle:
    !loot:          Der Zuschauer, das das eingibt, nimmt am Abenteuer teil.
    !inventory:     Zeigt alle Gegenstände des Zuschauers an, der den Befehl eingibt. Es wird der Name und die Nummer zum Handeln angezeigt.
    !start:         [Adminfunktion] Startet das Abenteuer.
    !stop:          [Adminfunktion] Beendet das Abenteuer.
    !clear:         [Adminfunktion] Löscht alle Abenteurer und Items aus den Inventaren.
    !steal:         Stiehlt einen zufällen Zuschauer ein Gegenstand und gibt es den, der den Befehl eingibt. 10%ige Chance auf Fehlschlag.
    !give:          Der Zuschauer, der den Befehl eingibt, gibt einen anderen Zuschauer ein Item aus dem Inventar. Es muss die Itemnummer aus dem Inventar und ein Zuschauer als Ziel eingegeben werden, der am Abenteuer teilnimmt.
                    Beispiel: !give:123 @Craffel -> Gibt Craffel das Item mit der Itemnummer 132.
Einstellungsmöglichkeiten:
    (Aktuell ohne Befehl über Konfigurationsdatei)
    - Zeit in Minuten, wie oft ein Item zufällig vergeben werden soll.   
Aktiv bei: 
    Craffel, SuperLootgeil```
    
```Modul: 
    Streamer und Mods [support]
Beschreibung:
    Modul zur automatischen anzeige der Streamer und Mods.
Befehle:
    !support:       zeigt alle Streamer und Mods an.
Einstellungsmöglichkeiten:
    (Aktuell ohne Befehl über Konfigurationsdatei)
    - Zeit in Minuten, wie oft die Streamer und Mods im Chat angezeigt weden soll.
    - Namen der Mods
    - Namen der Streamer
Aktiv bei: 
    Craffel, SuperLootgeil```

```Modul: 
    Hilfe [help]
Beschreibung:
    Modul zur automatischen Verwaltung von Hilfenachrichten.
    Zeigt nur die Hilfetexte von den Modulen an, die aktiv sind. 
Befehle:
    !help:          Zeigt alle Hilfetexte der aktiven Module an.
Einstellungsmöglichkeiten:
    (Aktuell ohne Befehl über Konfigurationsdatei)
    - Zeit in Minuten, wie oft die Hilfe im Chat angezeigt weden soll.
    - Alle Hilfetexte   
Aktiv bei: 
    Craffel, SuperLootgeil```

```Modul: 
    Spenden [donate]
Beschreibung:
    Modul für Spendenstreams. Jeder Zuschauer kann einmal pro Stream 1€ spenden. Das Geld muss vom Streamer bezahlt werden, kein Payment von Zuschauern.
    Ist super für Creators, die Affiliate werden möchten.
Befehle: 
    !donate:        Spende wird um 1€ erhöht. Benutzer wird gespeichert, sodass jeder nur einmal spenden kann.
    !donatemax:     [Adminfunktion] Spendenlimit kann während des Streams geändert werden.
Einstellungsmöglichkeiten:
    (Aktuell ohne Befehl über Konfigurationsdatei)
    - Zeit in Minuten, wie die Spendenaktion im Chat angezeigt weden soll.
    - Spendenziel, Organisation 
Aktiv bei: 
    Craffel, SuperLootgeil```

```Modul: 
    Administration [administration]
Beschreibung:
    Administrationstools. Dient aktuell dazu, alle aktiven Module zu starten / stoppen, damit der Chat nicht zugemüllt wird, wenn der Stream vorüber ist.
Befehle:
    !adminstart:    [Adminfunktion] Startet alle aktiven Module.
    !adminstop:     [Adminfunktion] Beendet alle aktiven Module.
Einstellungsmöglichkeiten:
    <nichts>
Aktiv bei: 
    Craffel, SuperLootgeil```

```Modul: 
    Streamingzeit [time]
Beschreibung: 
    Zeigt im Chat die Streamingzeit an.
Befehle:
    !time:          Zeigt die aktuelle Streamingdauer an.
    !timereset:     [Adminfunktion] Setzt die aktuelle Streamingdauer auf 0 zurück.
Einstellungsmöglichkeiten:
    <nichts>
Aktiv bei: 
    Craffel```

```Modul: 
    Keys versckenken [key]
Beschreibung: 
    Zeigt Key-Codes im Chat an, um die sich die Zuschauer streiten dürfen.
Befehle:
    <keine>
Einstellungsmöglichkeiten:
    (Aktuell ohne Befehl über Konfigurationsdatei)
    - Zeit in Minuten, wie oft ein Key im Chat rausgehauen weden soll.
    - Alle Keys (wird niemals über den Chat gehen :D)
Aktiv bei: 
    Craffel```

```[Adminfunktion]
Nur Channel-Owner können diese funktionen ausführen. Aktuell leider auch nicht die Mods, das ist aber für die Zukunft geplant.```