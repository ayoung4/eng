import { expect } from 'chai';

import { Vector } from '../src/vector';

describe('Vector', function () {

    describe('wrap', function () {

        it('wraps two numbers into a vector', function () {
            const [x, y] = Vector.wrap(4, 2);
            expect(x).to.equal(4);
            expect(y).to.equal(2);
        });

    });

    describe('map', function () {

        it('maps vector to new vector', function () {
            const v = Vector.wrap(4, 2);
            const [x, y] = Vector.map(v, (n) => n * 2);
            expect(x).to.equal(8);
            expect(y).to.equal(4);
        });

    });

    describe('equals', function () {

        it('returns true for when passed same vector', function () {
            const v = Vector.wrap(4, 2);
            expect(Vector.equals(v, v)).to.equal(true);
        });

        it('returns false for when passed different vectors', function () {
            const v1 = Vector.wrap(4, 2);
            const v2 = Vector.wrap(1, 0);
            expect(Vector.equals(v1, v2)).to.equal(false);
        });

    });

    describe('limit', function () {

        it('limits with positive numbers', function () {
            const v = Vector.wrap(4, 2);
            const [x, y] = Vector.limit(v, 1);
            expect(x).to.equal(1);
            expect(y).to.equal(1);
        });

        it('limits with negative numbers', function () {
            const v = Vector.wrap(-4, -2);
            const [x, y] = Vector.limit(v, 1);
            expect(x).to.equal(-1);
            expect(y).to.equal(-1);
        });

    });

    describe('round', function () {

        it('rounds a vector', function () {
            const v = Vector.wrap(-4.2, 2.9);
            const [x, y] = Vector.round(v);
            expect(x).to.equal(-4);
            expect(y).to.equal(3);
        });

    });

    describe('scale', function () {

        it('scales a vector', function () {
            const v = Vector.wrap(-3, 2);
            const [x, y] = Vector.scale(v, 2);
            expect(x).to.equal(-6);
            expect(y).to.equal(4);
        });

    });

    describe('add', function () {

        it('adds two vectors', function () {
            const v1 = Vector.wrap(4, 1);
            const v2 = Vector.wrap(3, -5);
            const [x, y] = Vector.add(v1, v2);
            expect(x).to.equal(7);
            expect(y).to.equal(-4);
        });

    });

    describe('subtract', function () {

        it('subtracts two vectors', function () {
            const v1 = Vector.wrap(4, 1);
            const v2 = Vector.wrap(3, -5);
            const [x, y] = Vector.subtract(v1, v2);
            expect(x).to.equal(1);
            expect(y).to.equal(6);
        });

    });

    describe('magnitude', function () {

        it('returns magnitude of vector', function () {
            const v = Vector.wrap(3, 4);
            const m = Vector.magnitude(v);
            expect(m).to.equal(5);
        });

    });

    describe('ofMagnitude', function () {

        it('returns vector of magnitude same direction but specified magnitude', function () {
            const v = Vector.wrap(3, 4);
            const [x, y] = Vector.ofMagnitude(v, 10);
            expect(x).to.equal(6);
            expect(y).to.equal(8);
        });

    });


});