/**
 * Hilfsfuktion zum Berechnen der Sinuswerte auf BAsis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function sinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    let y_pos = Math.sin(radians) * y_scale;

    return y_pos;
}

function cosinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    let y_pos = Math.cos(radians) * y_scale;

    return y_pos;
}

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getVerticesPointsArray() {
    let indexCounter = 0;

    for (let x = 0; x <= 360; x += 15) {
        // X Koordinate
        //if (x === 0) {
        pushVertices(sinusFromDegree(x, 100));
        pushIndex(indexCounter);
        indexCounter++;/*
        } else {
            pushVertices(vertices[0]);
            pushIndex(0);
            //indexCounter++;
        }*/

        // Y Koordinate
        pushVertices(cosinusFromDegree(x, 100));
        pushIndex(indexCounter);
        indexCounter++;

        // Farbwert
        pushVertices(1.0, 0.0, 0.0, 1);
        pushIndex(indexCounter, indexCounter + 1, indexCounter + 2, indexCounter + 3);
        indexCounter += 4;
    }
}

/**
 * Belegt den Ausgabebuffer des aktuellen WebGL Programms mit den aktuellen Daten neu und zeichnet die
 * Ausgabe. Das WebGL Programm muss zuvor bereits initialisiert und konfiguriert worden sein.
 */
function RefreshWaves() {
    // Arrays für neue Ausgabe füllen
    getVerticesPointsArray();

    // Buffer für die Punkte erzeugen und laden
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    // posAttrib erzeugen und verwenden
    var aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(program, 'aColor');
    gl.enableVertexAttribArray(aColor);

    // Zeiger erzeugen und konfigurieren
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 6 * 4, 2 * 4);

    // alte Ausgabe löschen
    gl.clear(gl.COLOR_BUFFER_BIT);

    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, verticesIndex, gl.STATIC_DRAW);
    ibo.numerOfEmements = vertices.length / 6;

    // Ausgabe
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //gl.drawArrays(gl.LINES, 0, vertices.length / 6);
    gl.drawElements(gl.LINES, ibo.numerOfEmements, gl.UNSIGNED_SHORT, 0);
}

/**
 * Startet die WebGL Anwendung und erste Ausgabe der Grafik
 */
iniWebGLApp();
