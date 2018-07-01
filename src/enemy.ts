import * as p5 from 'p5';
import * as _ from 'lodash';

import { Game } from './game';
import { Player } from './player';
import { Vector } from './vector';

export module Enemy {

    export interface IEnemy extends Game.ICharacter {
        size: number;
    };

    export const Enemy: () => IEnemy = () => ({
        health: 100,
        position: [100, 100],
        velocity: [0, 0],
        acceleration: [0, 0],
        size: 25,
    });

    export const update: (e: IEnemy, p: Player.IPlayer) => IEnemy =
        (e, p) => {
            const seeking = Game.seek(e, p.position);
            return Game.move(seeking) as IEnemy;
        };

    export const draw = (sketch: p5, { position, size }: IEnemy) => {
        const [x, y] = position;
        sketch.fill(255, 0, 0);
        sketch.ellipse(x, y, size);
    };

}
