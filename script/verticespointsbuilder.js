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
    // basiert auf http://www.3d-meier.de/tut3/Seite17.html

    vertices = new Float32Array([]);
    verticesIndexLine = new Uint16Array([]);
    verticesIndexTriangle = new Uint16Array([]);

    // a Durchmesser
    let a = 1;
    // b reelle Zahl mit b<a
    let b = 4;

    //u ist Element aus der Zahlenmenge [0, 6 pi]
    let u = 0;
    let uMax = 6 * Math.PI;
    let stepU = 30;
    let du = uMax / stepU;

    //v ist Element aus der Zahlenmenge [0, 2 pi]
    let v = 0.0;
    let vMax = 2 * Math.PI;
    let stepV = 30
    let dv = vMax / stepV;

    let opax = 0.0;
    let opax2 = 1.0;

    for (let u = 0.0, i = 0; i <= stepU; u += du, i++) {
        for (let v = 0.0, j = 0; j <= stepV; v += dv, j++) {

            let h = Math.exp(u / (6 * Math.PI));


            let iVertex = j * (stepV + 1) + i; // ==> Anzahl der Knoten

            let x = a * (1 - h) * Math.cos(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v);
            let y = 1 - Math.exp(u / (b * Math.PI)) - Math.sin(v) + h * Math.sin(v);
            let z = a * (-1 + h) * Math.sin(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v);

            // Punkte definieren
            pushVertices(x * 100); // X Koordinate
            pushVertices(y * 100); // Y Koordinate
            pushVertices(z * 100); // Z Koordinate

            if (j % 2 == 0) {
                pushVertices(0.0, opax2 -= 0.001, 0.0, 1); // Farbwert
            } else {
                pushVertices(0.0, opax2 -= 0.001, 0.0, 1); // Farbwert
            }

            // Define index for one Line
            if (i > 0 && j >= 0) { // Tiefe
                pushIndexLine(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                pushIndexLine(iVertex);
            }
            if (i > 0 && j >= 0) { // Kreise
                pushIndexLine(iVertex - (stepV + 1));
                pushIndexLine(iVertex);
            }

            // Define index for two triangles.
            if (j > 0 && i > 0) {
                pushIndexTriangle(iVertex);
                pushIndexTriangle(iVertex - 1);
                pushIndexTriangle(iVertex - (stepV + 1));
                //
                pushIndexTriangle(iVertex - 1);
                pushIndexTriangle(iVertex - (stepV + 1) - 1);
                pushIndexTriangle(iVertex - (stepV + 1));
            }
        }
    }
}

/**
 * Baut die Vertices Array für die Figur 2
 */
function getFigure2VerticesPointsArray() {
    //http://www.3d-meier.de/tut3/Seite22.html

    vertices = new Float32Array([]);
    verticesIndexLine = new Uint16Array([]);
    verticesIndexTriangle = new Uint16Array([]);

    //u ist Element aus der Zahlenmenge [-1.5, 1.5]
    let uMin = -1.5;
    let uMax = 1.5;
    let stepU = 30;
    let du = (uMax - uMin) / stepU;

    //v ist Element aus der Zahlenmenge [-1.5, 1.5]
    let vMin = -1.5;
    let vMax = 1.5;
    let stepV = 30;
    let dv = (vMax - vMin) / stepV;


    for (let u = uMin, i = 0; i <= stepU; u += du, i++) {
        for (let v = vMin, j = 0; j <= stepV; v += dv, j++) {
            let iVertex = i * (stepU + 1) + j; // ==> Anzahl der Knoten

            let x = u * v;
            let y = u;
            let z = Math.pow(v, 2);

            // Punkte definieren
            pushVertices(x * 100); // X Koordinate
            pushVertices(y * 100); // Y Koordinate
            pushVertices(z * 100); // Z Koordinate
            pushVertices(0.0, 1.0, 0.0, 1); // Farbwert

            // Define index for one Line
            if (i > 0 && j >= 0) {
                pushIndexLine(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                pushIndexLine(iVertex);
            }
            if (i > 0 && j >= 0) {
                pushIndexLine(iVertex - (stepV + 1));
                pushIndexLine(iVertex);
            }

            // Define index for two triangles.
            if (i > 0 && j >= 0) {
                pushIndexTriangle(iVertex);
                pushIndexTriangle(iVertex - 1);
                pushIndexTriangle(iVertex - (stepV + 1));
                //
                pushIndexTriangle(iVertex - 1);
                pushIndexTriangle(iVertex - (stepV + 1) - 1);
                pushIndexTriangle(iVertex - (stepV + 1));
            }
        }
    }
}

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getFigure3VerticesPointsArray() {
    vertices = new Float32Array([]);
    verticesIndexLine = new Uint16Array([]);
    verticesIndexTriangle = new Uint16Array([]);

    // Parameter Winkel/Grad
    let stepT = 16
    let dg = 360 / stepT;

    // Parameter Radius
    let stepR = 3;
    let dr = 250 / stepR;

    for (let grad = 0.0, i = 0; i <= stepT; grad += dg, i++) {
        for (let radius = 0.0, j = 0; j <= stepR; radius += dr, j++) {
            let iVertex = i * (stepR + 1) + j; // ==> Anzahl der Knoten

            // Punkte definieren
            pushVertices(sinusFromDegree(grad, radius)); // X Koordinate
            pushVertices(cosinusFromDegree(grad, radius)); // Y Koordinate
            pushVertices(0); // Z Koordinate

            if (i % 2 == 0) {
                pushVertices(1.0, 0.0, 0.0, 1); // Farbwert
            } else if (i % 3 == 0) {
                pushVertices(0.0, 1.0, 0.0, 1); // Farbwert
            } else {
                pushVertices(0.0, 0.0, 1.0, 1); // Farbwert
            }

            // Define index for one Line
            if (i > 0 && j >= 0) { // Radien
                pushIndexLine(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                pushIndexLine(iVertex);
            }
            if (i > 0 && j >= 0) { // Kreise
                if (i % 2 === 0) {
                    pushIndexLine(iVertex - (stepR + 1));
                    pushIndexLine(iVertex);
                } else {
                    if (j < stepR) {
                        pushIndexLine(iVertex - (stepR + 1));
                        pushIndexLine(iVertex);
                    }
                }
            }

            // Define index for two triangles.
            if (j > 0 && i > 0) {
                if (i % 2 === 0) {
                    pushIndexTriangle(iVertex);
                    pushIndexTriangle(iVertex - 1);
                    pushIndexTriangle(iVertex - (stepR + 1));
                    //
                    pushIndexTriangle(iVertex - 1);
                    pushIndexTriangle(iVertex - (stepR + 1) - 1);
                    pushIndexTriangle(iVertex - (stepR + 1));
                } else {
                    if (j < stepR) {
                        pushIndexTriangle(iVertex);
                        pushIndexTriangle(iVertex - 1);
                        pushIndexTriangle(iVertex - (stepR + 1));
                        //
                        pushIndexTriangle(iVertex - 1);
                        pushIndexTriangle(iVertex - (stepR + 1) - 1);
                        pushIndexTriangle(iVertex - (stepR + 1));
                    }
                }
            }
        }
    }
}