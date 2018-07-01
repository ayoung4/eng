import { expect } from 'chai';
import { Vector } from '../src/vector';

describe('Vector', function () {

    it('limits vectors with positive numbers', function () {
        const v: Vector.Vector = [4, 2];
        const [ x, y ] = Vector.limit(v, 1);
        expect(x).to.equal(1);
        expect(y).to.equal(1);
    });

    it('limits vectors with negative numbers', function () {
        const v: Vector.Vector = [-4, -2];
        const [ x, y ] = Vector.limit(v, 1);
        expect(x).to.equal(-1);
        expect(y).to.equal(-1);
    });

});