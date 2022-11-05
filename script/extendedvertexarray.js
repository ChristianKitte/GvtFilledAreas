/**
 * Array, das die unterschiedlichen Vertices für die Ausgabe hält
 * @type {Float32Array} Ein neues Float32 Array
 */
var vertices = new Float32Array([]);

/**
 * Array, das die aktuellen VerticesIndizes für die Ausgabe hält
 * @type {Uint16Array}
 */
var verticesIndex = new Uint16Array([]);

/**
 * Hilfsfunktion, um im Array vertices dynamisch einen neuen Wert
 * hinzuzufügen
 *
 * https://stackoverflow.com/questions/24410418/push-on-float32array
 * https://javascript.plainenglish.io/advanced-array-methods-in-javascript-d33e4b12de25
 *
 */
function pushVertices() {
    vertices = new Float32Array([...vertices, ...arguments]);
}

/**
 * Hilfsfunktion, um im Array verticesIndex dynamisch einen neuen Wert
 * hinzuzufügen
 *
 */
function pushIndex() {
    verticesIndex = new Uint16Array([...verticesIndex, ...arguments]);
}



