import * as p5 from 'p5';
import * as _ from 'lodash';

import { Game } from './game';
import { Player } from './player';
import { Physics } from './physics';
import { Vector } from './vector';

export module Enemy {

    export interface IEnemy extends Game.ICharacter {
        size: number;
    };

    export const Enemy: () => IEnemy = () => ({
        health: 100,
        body: {
            position: [100, 100],
            velocity: [0, 0],
            acceleration: [0, 0],
        },
        size: 25,
    });

    export const update: (e: IEnemy, p: Player.IPlayer) => IEnemy =
        (e, p) => {
            const body = Physics.applySeek(e.body, p.body.position);
            return {
                ...e,
                body: Physics.move(body),
            }
        };

    export const draw = (sketch: p5, { body, size }: IEnemy) => {
        const [x, y] = Vector.round(body.position);
        sketch.fill(255, 0, 0);
        sketch.ellipse(x, y, size);
    };

}
