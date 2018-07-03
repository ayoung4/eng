import * as p5 from 'p5';

import { Game } from './game';
import { Vector } from './vector';
import { Physics } from './physics';

export module Player {

    const PLAYER_SIZE = 25;

    export interface IPlayer extends Game.ICharacter {
        gun: {
            canFire: boolean;
        };
    }

    export const Player: () => IPlayer = () => ({
        health: 100,
        body: {
            position: [2 * Game.WIDTH / 3, Game.HEIGHT - 50],
            velocity: [0, 0],
            acceleration: [0, 0],
        },
        gun: { canFire: true },
    });

    export const update: (p: IPlayer, mousePosition: Physics.Position) => IPlayer =
        (p, mousePosition) => {
            const body = Physics.applySeek(p.body, mousePosition);
            return {
                ...p,
                body: Physics.move(body),
            }
        };

    export const draw = (sketch: p5, { body }: IPlayer) => {
        const [x, y] = Vector.round(body.position);
        sketch.fill(0, 0, 255);
        sketch.ellipse(x, y, PLAYER_SIZE);
    };

}