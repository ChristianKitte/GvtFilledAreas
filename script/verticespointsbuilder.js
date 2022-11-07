/**
 * Hilfsfuktion zum Berechnen der Sinuswerte auf Basis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function sinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    let y_pos = Math.sin(radians) * y_scale;

    return y_pos;
}

/**
 * Hilfsfuktion zum Berechnen der Cosinuswerte auf Basis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function cosinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    let y_pos = Math.cos(radians) * y_scale;

    return y_pos;
}

/**
 * Baut die Vertices Array für die Figur 1 (Möbiusband)
 */
function getFigure1VerticesPointsArray() {
    vertices = new Float32Array([]);
    verticesIndex = new Uint16Array([]);
    let indexCounter = 0;

    let a = 100.0;
    let b = 200.0
    let c = 150.0

    let n = 10.0;
    let du = a / n;

    let m = 10.0;
    let dv = Math.pi * 2.0 / m;

    for (let v = 0, i = 0; i < m; v += dv, i++) {
        for (let u = 0, j = 0; j < n; u += du, j++) {

            x = c * Math.sqrt(u * (u - a) * (u - b)) * Math.sin(v) * 50;
            y = u * 50;
            z = c * Math.sqrt(u * (u - a) * (u - b)) * Math.cos(v) * 50;

            pushVertices(x, y, z, 1.0, 0.0, 0.0, 1);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
            pushIndex(indexCounter++);
        }
    }


}

/**
 * Baut die Vertices Array für die Figur 2
 */
function getFigure2VerticesPointsArray() {

}

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getFigure3VerticesPointsArray() {
    vertices = new Float32Array([]);
    verticesIndex = new Uint16Array([]);

    let stepT = 16
    let dg = 360 / stepT;

    let stepR = 3;
    let dr = 250 / stepR;

    for (let grad = 0.0, i = 0; i <= stepT; grad += dg, i++) {
        for (let radius = 0.0, j = 0; j <= stepR; radius += dr, j++) {
            var iVertex = i * (stepR + 1) + j; // ==> Anzahl der Knoten

            // Punkte definieren
            pushVertices(sinusFromDegree(grad, radius)); // X Koordinate
            pushVertices(cosinusFromDegree(grad, radius)); // Y Koordinate
            pushVertices(0); // Z Koordinate
            pushVertices(1.0, 0.0, 0.0, 1); // Farbwert

            // Ausgabe definieren
            if (i > 0 && j >= 0) {
                pushIndex(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                pushIndex(iVertex);
            }
            if (i > 0 && j >= 0) {
                if (i % 2 === 0) {
                    pushIndex(iVertex - (stepR + 1));
                    pushIndex(iVertex);
                } else {
                    if (j < stepR) {
                        pushIndex(iVertex - (stepR + 1));
                        pushIndex(iVertex);
                    }
                }
            }
        }
    }
}