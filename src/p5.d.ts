
declare class p5Sketch {

    setup: () => void;
    draw: () => void;
    mousePressed: () => void;
    createCanvas: (w: number, h: number) => void;
    // color
    background: (r: number, g: number, b: number, a: number) => void;
    clear: () => void;
    colorMode: (mode: 'RGB' | 'HSB' | 'HSL', m1?: number, m2?: number, m3?: number, mA?: number) => void;
    fill: (r: number, g: number, b: number) => void;
    noFill: () => void;
    noStroke: () => void;
    stroke: (r: number, g: number, b: number, a: number) => void;
    // 2D primitives
    arc: (a: number, b: number, c: number, d: number, start: number, stop: number, mode?: 'OPEN' | 'CHORD' | 'PIE') => void;
    // ellipse
    // line
    // point
    // quad
    // rect
    // triange
    // // 3D primitives
    // plane
    // box
    // sphere
    // cylinder
    // cone
    // ellipsoid
    // torus
}
