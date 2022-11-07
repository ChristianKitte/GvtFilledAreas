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
 * Baut die Vertices Array für die Linie und Dreiecke auf Basis der Vorgabewerte
 */
function getFigure3VerticesPointsArray() {
    vertices = new Float32Array([]);
    verticesIndex = new Uint16Array([]);
    let indexCounter = 0;

    let dt = 360 / 15;
    let dr = 100 / 2;

    for (let t = 0; t <= 360; t += dt) {

        for (let radius = 0.0; radius <= 100.0; radius += dr) {
            // Punkte definieren
            pushVertices(sinusFromDegree(t, radius)); // X Koordinate
            indexCounter++;
            pushVertices(cosinusFromDegree(t, radius)); // Y Koordinate
            indexCounter++;
            pushVertices(0); // Z Koordinate
            indexCounter++;
            pushVertices(1.0, 0.0, 0.0, 1); // Farbwert
            indexCounter += 4;

            // Ausgabe definieren
            if (t > 0 && radius > 0) {


                pushIndex(indexCounter - 14);
                pushIndex(indexCounter - 13);
                pushIndex(indexCounter - 12);
                pushIndex(indexCounter - 11, indexCounter - 10, indexCounter - 9, indexCounter - 8);

                pushIndex(indexCounter - 7);
                pushIndex(indexCounter - 6);
                pushIndex(indexCounter - 5);
                pushIndex(indexCounter - 4, indexCounter - 3, indexCounter - 2, indexCounter - 1);

                pushIndex(indexCounter - 35);
                pushIndex(indexCounter - 34);
                pushIndex(indexCounter - 33);
                pushIndex(indexCounter - 32, indexCounter - 31, indexCounter - 30, indexCounter - 29);

                pushIndex(indexCounter - 28);
                pushIndex(indexCounter - 27);
                pushIndex(indexCounter - 26);
                pushIndex(indexCounter - 25, indexCounter - 24, indexCounter - 23, indexCounter - 22);


            }

            /*
                        if (x === 0) {
                            if (radius > 0) {
                                pushIndex(indexCounter - 14);
                                pushIndex(indexCounter - 13);
                                pushIndex(indexCounter - 12);
                                pushIndex(indexCounter - 11, indexCounter - 10, indexCounter - 9, indexCounter - 8);

                                pushIndex(indexCounter - 7);
                                pushIndex(indexCounter - 6);
                                pushIndex(indexCounter - 5);
                                pushIndex(indexCounter - 4, indexCounter - 3, indexCounter - 2, indexCounter - 1);
                            } else if (radius === 0) {
                                pushIndex(indexCounter - 7);
                                pushIndex(indexCounter - 6);
                                pushIndex(indexCounter - 5);
                                pushIndex(indexCounter - 4, indexCounter - 3, indexCounter - 2, indexCounter - 1);
                            }
                        } else if (x > 0) {
                            if (radius > 0) {
                                pushIndex(indexCounter - 14);
                                pushIndex(indexCounter - 13);
                                pushIndex(indexCounter - 12);
                                pushIndex(indexCounter - 11, indexCounter - 10, indexCounter - 9, indexCounter - 8);

                                pushIndex(indexCounter - 7);
                                pushIndex(indexCounter - 6);
                                pushIndex(indexCounter - 5);
                                pushIndex(indexCounter - 4, indexCounter - 3, indexCounter - 2, indexCounter - 1);
                            } else if (radius === 0) {
                                pushIndex(indexCounter - 7);
                                pushIndex(indexCounter - 6);
                                pushIndex(indexCounter - 5);
                                pushIndex(indexCounter - 4, indexCounter - 3, indexCounter - 2, indexCounter - 1);
                            }
                        }*/
        }
    }
}