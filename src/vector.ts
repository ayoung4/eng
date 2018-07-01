export module Vector {

    export type Vector = [number, number];

    export const scale: (v: Vector, s: number) => Vector =
        ([x, y], s) => ([x * s, y * s]);

    export const add: (v1: Vector, v2: Vector) => Vector =
        ([x1, y1], [x2, y2]) => ([x1 + x2, y1 + y2]);

    export const subtract: (v1: Vector, v2: Vector) => Vector =
        (v1, v2) => add(v1, scale(v2, -1));

    const limitNumber: (n: number, l: number) => number =
        (n, l) => n >= 0 ? Math.min(n, l) : Math.max(n, l * -1);

    export const limit: (v: Vector, l: number) => Vector =
        ([x, y], l) => [limitNumber(x, l), limitNumber(y, l)];

    export const limiterOf: (l: number) => (v: Vector) => Vector =
        (l) => (v) => limit(v, l);

    export const magnitude: (v: Vector) => number =
        ([x, y]) => Math.sqrt((x * x) + (y * y));

    export const ofMagnitude: (v: Vector, m: number) => Vector =
        (v, m) => scale(v, m / magnitude(v));

    export const findSteering: (p1: Vector, p2: Vector, velocity: Vector, maxSpeed: number) => Vector =
        (v1, v2, velocity, maxSpeed) => {
            const desired = subtract(v1, v2);
            const distance = magnitude(desired);
            const speed = distance > 30
                ? maxSpeed
                : 0;
            const scaled = ofMagnitude(desired, speed);
            return subtract(scaled, velocity);
        }
}
