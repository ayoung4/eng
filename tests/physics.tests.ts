import { expect } from 'chai';
import * as _  from 'lodash';

import { Physics } from '../src/physics';
import { Vector } from '../src/vector';

describe('Physics', function () {

    describe('Body', function () {

        it('constructs a body', function () {
            const position = Vector.zero();
            const body = Physics.Body(position);
            expect(body.acceleration).to.not.be.undefined;
            expect(body.position).to.not.be.undefined;
            expect(body.velocity).to.not.be.undefined;
        });

    });

});
