/**
 * Hilfsfuktion zum Berechnen der Sinuswerte auf Basis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function sinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    return Math.sin(radians) * y_scale;
}

/**
 * Hilfsfuktion zum Berechnen der Cosinuswerte auf Basis von Grad
 * @param degree zu berechnender Grad
 * @param y_scale die zu verwendende Skalierung der Amplitude
 * @returns {number} Der skalierte Sinuswert
 */
function cosinusFromDegree(degree, y_scale) {
    let radians = degree * Math.PI / 180.0;
    return Math.cos(radians) * y_scale;
}

/**
 * Baut die Vertices Array für die Figur 1 auf Basis enes Modells auf
 * basiert auf http://www.3d-meier.de/tut3/Seite17.html
 */
function getFigure1VerticesPointsArray() {
    verticesx = [];
    verticesIndexLinex = [];
    verticesIndexTrianglex = [];

    vertices = new Float32Array([]);
    verticesIndexLine = new Uint16Array([]);
    verticesIndexTriangle = new Uint16Array([]);

    // a Durchmesser
    let a = 1.0;
    // b reelle Zahl mit b<a
    let b = 4.0;

    //u ist Element aus der Zahlenmenge [0, 6 pi]
    let uMax = 4.0 * Math.PI;
    let stepU = 30.0;
    let du = uMax / stepU;

    //v ist Element aus der Zahlenmenge [0, 2 pi]
    let vMax = 2.0 * Math.PI;
    let stepV = 30.0
    let dv = vMax / stepV;

    // Farbwerte
    let R = 1.0;
    let G = 0.0;
    let B = 0.0;

    for (let u = 0.0, i = 0; i <= stepU; u += du, i++) {
        let h = Math.exp(u / (6.0 * Math.PI));

        for (let v = 0.0, j = 0; j <= stepV; v += dv, j++) {
            let iVertex = j * (stepV + 1) + i; // ==> Anzahl der Knoten

            let x = a * (1.0 - h) * Math.cos(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v);
            let y = 1.0 - Math.exp(u / (b * Math.PI)) - Math.sin(v) + h * Math.sin(v);
            let z = a * (-1.0 + h) * Math.sin(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v);

            // define vertices
            verticesx.push(x * 100.0); // X Koordinate
            verticesx.push(y * 100.0); // Y Koordinate
            verticesx.push(z * 100.0); // Z Koordinate

            verticesx.push(R, G, B, 1.0); // Farbwert

            R -= 1.0 / (stepU * stepV);
            G += 1.0 / (stepU * stepV);

            // Define index for one Line
            if (i > 0 && j >= 0) { // Tiefe
                verticesIndexLinex.push(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                verticesIndexLinex.push(iVertex);
            }
            if (i > 0 && j >= 0) { // Kreise
                verticesIndexLinex.push(iVertex - (stepV + 1));
                verticesIndexLinex.push(iVertex);
            }

            // Define index for two triangles (CW und CCW).
            if (j > 0 && i > 0) {
                verticesIndexTrianglex.push(iVertex);
                verticesIndexTrianglex.push(iVertex - 1);
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
                // ...die Rückseite
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
                verticesIndexTrianglex.push(iVertex - 1);
                verticesIndexTrianglex.push(iVertex);
                //
                verticesIndexTrianglex.push(iVertex - 1);
                verticesIndexTrianglex.push(iVertex - (stepV + 1) - 1);
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
                // ...die Rückseite
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
                verticesIndexTrianglex.push(iVertex - (stepV + 1) - 1);
                verticesIndexTrianglex.push(iVertex - 1);
            }
        }
    }
}

/**
 * Baut die Vertices Array für die Figur 2 auf Basis enes Modells auf
 * http://www.3d-meier.de/tut3/Seite22.html
 */
function getFigure2VerticesPointsArray() {
    verticesx = [];
    verticesIndexLinex = [];
    verticesIndexTrianglex = [];

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

    // Farbwerte
    var R = 1.0;
    var G = 0.0;
    var B = 0.0;

    for (let u = uMin, i = 0; i <= stepU; i++, u += du) {

        for (let v = vMin, j = 0; j <= stepV; j++, v += dv) {
            let iVertex = i * (stepV + 1) + j; // ==> Anzahl der Knoten

            let x = u * v;
            let y = u;
            let z = Math.pow(v, 2);

            // define vertices
            verticesx.push(x * 100); // X Koordinate
            verticesx.push(y * 100); // Y Koordinate
            verticesx.push(z * 100); // Z Koordinate
            verticesx.push(R, G, B, 1); // Farbwert

            R -= 1.0 / (stepU * stepV);
            G += 1.0 / (stepU * stepV);

            // Define index for one Line
            if (i > 0 && j > 0) {
                verticesIndexLinex.push(iVertex - 1); // ==> Es reicht der 1 Eintrag des Knoten !!!
                verticesIndexLinex.push(iVertex);
            }
            if (i > 0 && j > 0) {
                verticesIndexLinex.push(iVertex - 1 - (stepV + 1));
                verticesIndexLinex.push(iVertex);
            }

            // Define index for two triangles
            if (i > 0 && j >= 0) {
                verticesIndexTrianglex.push(iVertex);
                verticesIndexTrianglex.push(iVertex - 1);
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
                //
                verticesIndexTrianglex.push(iVertex);
                verticesIndexTrianglex.push(iVertex - 1 - (stepV + 1));
                verticesIndexTrianglex.push(iVertex - (stepV + 1));
            }
        }
    }
}

var verticesx = [];
var verticesIndexLinex = [];
var verticesIndexTrianglex = [];

/**
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getFigure3VerticesPointsArray() {
    verticesx = [];
    verticesIndexLinex = [];
    verticesIndexTrianglex = [];

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
            verticesx.push(sinusFromDegree(grad, radius)); // X Koordinate
            verticesx.push(cosinusFromDegree(grad, radius)); // Y Koordinate
            verticesx.push(0); // Z Koordinate

            if (i % 2 === 0) {
                verticesx.push(1.0, 0.0, 0.0, 1); // Farbwert
            } else if (i % 3 === 0) {
                verticesx.push(0.0, 1.0, 0.0, 1); // Farbwert
            } else {
                verticesx.push(0.0, 0.0, 1.0, 1); // Farbwert
            }

            // Define index for one Line
            if (i > 0 && j >= 0) { // Radien
                verticesIndexLinex.push(()=>{return iVertex - 1}); // ==> Es reicht der 1 Eintrag des Knoten !!!
                verticesIndexLinex.push(iVertex);
            }
            if (i > 0 && j >= 0) { // Kreise
                if (i % 2 === 0) {
                    verticesIndexLinex.push(iVertex - (stepR + 1));
                    verticesIndexLinex.push(iVertex);
                } else {
                    if (j < stepR) {
                        verticesIndexLinex.push(iVertex - (stepR + 1));
                        verticesIndexLinex.push(iVertex);
                    }
                }
            }

            // Define index for two triangles.
            if (j > 0 && i > 0) {
                if (i % 2 === 0) {
                    verticesIndexTrianglex.push(iVertex);
                    verticesIndexTrianglex.push(iVertex - 1);
                    verticesIndexTrianglex.push(iVertex - (stepR + 1));
                    //
                    verticesIndexTrianglex.push(iVertex - 1);
                    verticesIndexTrianglex.push(iVertex - (stepR + 1) - 1);
                    verticesIndexTrianglex.push(iVertex - (stepR + 1));
                } else {
                    if (j < stepR) {
                        verticesIndexTrianglex.push(iVertex);
                        verticesIndexTrianglex.push(iVertex - 1);
                        verticesIndexTrianglex.push(iVertex - (stepR + 1));
                        //
                        verticesIndexTrianglex.push(iVertex - 1);
                        verticesIndexTrianglex.push(iVertex - (stepR + 1) - 1);
                        verticesIndexTrianglex.push(iVertex - (stepR + 1));
                    }
                }
            }
        }
    }
}