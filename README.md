# Quick Quiz - Wirtschaftspolitik

Willkommen zu unserem **Quick Quiz**! 🎮  
Dieses Projekt wurde im Rahmen einer **Schulaufgabe** im Fach **Informatik** von Ville Zeumer und Simon Heisler erstellt. Die Website dient dazu, auf unterhaltsame Weise mehr über **Wirtschaftspolitik** zu lernen und das Wissen in diesem Bereich zu testen.

## 🚀 Projektbeschreibung

Das **Quick Quiz** ist eine interaktive Webanwendung, die es den Nutzern ermöglicht, ihr Wissen über Wirtschaftspolitik zu testen. Durch eine Reihe zufällig ausgewählter Fragen und mit einem eingebauten Timer müssen die Spieler ihr Wissen in einem spannenden Quiz unter Beweis stellen. Das Quiz besteht aus einer **Startseite**, einer **Spielseite** und einer **Highscore-Seite**, um den Spielverlauf und die besten Ergebnisse zu speichern.

### Technologie-Stack

Das Projekt nutzt die folgenden Technologien:

- **HTML** 📝: Strukturiert die Seite und sorgt für die Grundfunktionen der Webanwendung.
- **CSS** 🎨: Gestaltet das Design und Layout der Seite, um eine benutzerfreundliche und optisch ansprechende Oberfläche zu bieten.
- **JavaScript** 💻: Steuert die interaktive Logik des Quiz, einschließlich Timer, Punktesystem und Spielabläufen.

## 📊 Features im Detail

### 1. **Startseite**
   - **Quiz spielen:** Auf der Startseite können Benutzer das Quiz starten, um ihre Kenntnisse zu testen.
   - **Highscores ansehen:** Nutzer können die besten Punktzahlen der Spieler einsehen und sich mit anderen messen.

### 2. **Spielseite**
   - **Fragen und Optionen:** Die Fragen zu Wirtschaftspolitik werden zufällig geladen. Jede Frage hat mehrere Antwortoptionen, die der Spieler auswählen kann.
   - **Variierende Antwortmöglichkeiten:** Die Anzahl der Antwortoptionen kann variieren, was für eine dynamische Spielerfahrung sorgt.
   - **Timer:** Ein Countdown von 10 Sekunden läuft für jede Frage, um die Antwortgeschwindigkeit zu messen. Wenn der Timer abläuft, wird die Antwort als falsch gewertet.
   - **Punkteberechnung:** Die Punkte für jede Frage werden anhand der Geschwindigkeit des Spielers und der richtigen Antwort vergeben. Je schneller die Antwort, desto mehr Punkte gibt es.
   - **Live-Feedback:** Nachdem eine Antwort ausgewählt wurde, wird sofort angezeigt, ob sie richtig oder falsch war. Bei einer falschen Antwort wird die korrekte Option hervorgehoben.
   - **Individuelle Bilder:** Zu jeder Frage kann ein individuelles Bild angezeigt werden, das der jeweiligen Frage zugeordnet ist.

### 3. **Highscore-Seite**
   - **Ergebnisse speichern:** Die Punktzahl, die Anzahl der richtigen und falschen Antworten sowie die maximal erreichbaren Punkte werden am Ende des Spiels angezeigt.
   - **Speichern im lokalen Speicher:** Der Benutzer kann seinen Namen eingeben und seine Punktzahl speichern. Diese wird dann in einer Highscore-Liste angezeigt, die regelmäßig aktualisiert wird.
   - **Vergleiche:** Spieler können ihre Punktzahl mit anderen vergleichen und sehen, wie gut sie im Vergleich zu anderen Spielern abschneiden.

### 4. **Ergebnisseite (end.html)**
   - **Punktzahl und Ergebnisse:** Am Ende des Spiels wird die Punktzahl angezeigt, zusammen mit der Anzahl der richtig und falsch beantworteten Fragen.
   - **Ergebnisse speichern:** Der Spieler hat die Möglichkeit, seinen Namen einzugeben und die Punktzahl zu speichern.
   - **Leistungsbewertung:** Abhängig von der erreichten Punktzahl wird eine Nachricht angezeigt, z. B. „Perfekt!“ oder „Gut gemacht!“.
   - **Ergebnis-GIFs:** Ein GIF wird basierend auf der Punktzahl des Spielers angezeigt, das die Leistung visuell darstellt.

## ⚙️ JavaScript-Funktionalität

Die Logik des Spiels ist in JavaScript umgesetzt und bietet eine Reihe dynamischer Funktionen:

- **Fragen zufällig auswählen:** Die Reihenfolge der Fragen ist zufällig, sodass das Spiel bei jedem Start anders ist.
- **Countdown und Timer:** Für jede Frage läuft ein Countdown von 10 Sekunden. Der Spieler muss innerhalb dieser Zeit antworten, um die volle Punktzahl zu erhalten.
- **Punktesystem:** Die Punkte werden dynamisch berechnet, wobei die Antwortgeschwindigkeit und die richtige Antwort die Punktzahl beeinflussen. Schnellere Antworten bringen mehr Punkte.
- **Live-Feedback:** Sobald der Spieler eine Antwort auswählt, wird sofort angezeigt, ob diese richtig oder falsch ist. Bei einer falschen Antwort wird die richtige Antwort hervorgehoben.
- **Speichern der Punktzahl:** Am Ende des Spiels kann der Spieler seinen Namen eingeben, um die Punktzahl im lokalen Speicher zu speichern und in die Highscore-Liste aufzunehmen.

## 📈 Erweiterte Features

- **Responsives Design:** Das Layout passt sich automatisch an verschiedene Bildschirmgrößen an, sodass das Quiz sowohl auf Desktops als auch auf mobilen Geräten gut funktioniert.
- **Interaktive Elemente:** Der Einsatz von JavaScript ermöglicht eine dynamische und interaktive Benutzeroberfläche mit Countdown-Timer, Fortschrittsbalken und Echtzeit-Punkteanzeige.
- **Datenpersistenz:** Spielergebnisse werden lokal gespeichert, sodass Nutzer ihren Fortschritt auch nach dem Verlassen der Seite wieder aufrufen können.

## 🎯 Fazit

Das **Quick Quiz** bietet eine unterhaltsame und lehrreiche Möglichkeit, Wissen über Wirtschaftspolitik zu testen. Mit zufällig ausgewählten Fragen, einem Countdown-Timer und einem dynamischen Punktesystem wird das Quiz sowohl herausfordernd als auch spannend. Die Möglichkeit, Ergebnisse zu speichern und mit anderen zu vergleichen, macht das Spiel noch interessanter und motivierender. 

Lass uns wissen, wie du abgeschnitten hast! Viel Spaß beim Spielen und Lernen! 🚀
