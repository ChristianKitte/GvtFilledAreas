/**
 * Der Code des Vertex Shader der über jeden Punkt ausgeführt wird
 * @type {string}
 */
const vertexShaderSource = `#version 300 es  
    
    in vec3 aPosition;
    in vec4 aColor;
    
    out vec4 vColor;
    
    void main()
    {
        vColor = vec4(aColor);
        
        gl_Position=vec4(aPosition, 365);
        gl_PointSize=1.0;       
    }
`;

/**
 * Der Code des Fragment Shader, der über jeden Pixel des Fragments ausgeführt wird.
 * @type {string} Der Code
 */
const fragmentShaderSouce = `#version 300 es
    
    precision mediump float;

    in vec4 vColor;
    
    out vec4 fragColor;

    void main()
    {       
        fragColor=vColor;
    }
`;