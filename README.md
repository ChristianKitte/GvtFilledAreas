![image](https://user-images.githubusercontent.com/32162305/150810942-99672aac-99af-47ea-849b-ba263fae0c3f.png)

---

**Graphical Visualisation Technologies**

**Dozent: Prof. Dr. Felix Gers (Berliner Hochschule für Technik)**

**Studiengang Medieninformatik Online MA, Wintersemester 2022/23**

**University of Applied Sciences Emden/Leer, Faculty of Technology, Department of Electrical Engineering and
Informatics**

---

### Einsendeaufgabe EA4 : Eingefärbte Flächen.

[zur Webseite](https://gvt.ckitte.de/ea4/)

Im Rahmen der vierten Einsendeaufgabe sollen zunächst zusammenhängende Flächen als Gitter (Linien),
zusätzlich später mit kolorierten Flächen erzeugt und mittels WebGL dargestellt werden.

Über drei Buttons können drei verschiedene Modelle zur Anzeige gebracht werden. Über die Checkbox kann gesteuert
werden, ob das jeweilige Modell mit einer Fläche oder nur als Gittermodell angezeigt werden soll.

Modell 1:

Modell 2:

Modell 3:

Als Startseite dient wie üblich eine **index.html**. Die Datei **main.css** enthält alle benötigten Klassen, um die
Grafik
einfach einzubinden. In der Datei **layout.css** wird das Layout der Webseite selbst festgelegt. Daneben kommt Bootstrap
für die Buttons zum Einsatz.

Die Logik verteilt sich auf mehrere JavaScript Dateien, welche von **main.js** genutzt werden. WebGL selbst und der
Shadercode befinden sich in den Dateien **webglconfig.js** und **shader.js**. In der Datei **configure.js** werden die
Programmeinstellungen gehalten. Die Datei **extendedvertexarray.js** handelt Arrayfunktionen und die Arrays selbst.

Der Canvas als zentrales Ausgabeobjekt wurde in der **index.html** angelegt und mit einer fixen Breite von 1000px
belegt. Alle anderen Einstellungen erfolgen über CSS.
