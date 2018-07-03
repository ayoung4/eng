import * as _ from 'lodash';

export module Vector {

    export type Vector = [number, number];

    export const wrap: (x: number, y: number) => Vector =
        (x, y) => ([x, y]);

    export const zero: () => Vector = () => wrap(0, 0);

    export const equals: (v1: Vector, v2: Vector) => boolean =
        ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

    export const map: (v: Vector, fn: (n: number) => number) => Vector =
        ([x, y], fn) => wrap(fn(x), fn(y));

    export const limit: (v: Vector, l: number) => Vector =
        (v, l) => map(v, (n) => n >= 0
            ? Math.min(n, l)
            : Math.max(n, -l));

    export const round: (v: Vector) => Vector =
        (v) => map(v, Math.round);

    export const scale: (v: Vector, s: number) => Vector =
        (v, s) => map(v, (n) => n * s);

    export const add: (v1: Vector, v2: Vector) => Vector =
        ([x1, y1], [x2, y2]) => ([x1 + x2, y1 + y2]);

    export const subtract: (v1: Vector, v2: Vector) => Vector =
        (v1, v2) => add(v1, scale(v2, -1));

    export const magnitude: (v: Vector) => number =
        ([x, y]) => Math.sqrt((x * x) + (y * y));

    export const ofMagnitude: (v: Vector, m: number) => Vector =
        (v, m) => scale(v, m / magnitude(v));

}
