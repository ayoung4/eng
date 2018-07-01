import * as p5 from 'p5';

import { Game } from './game';
import { Vector } from './vector';

export module Player {

    const PLAYER_SIZE = 25;

    export interface IPlayer extends Game.ICharacter {
        gun: {
            canFire: boolean;
        };
    }

    export const Player: () => IPlayer = () => ({
        health: 100,
        position: [Game.WIDTH / 2, Game.HEIGHT / 2],
        velocity: [0, 0],
        acceleration: [0, 0],
        gun: { canFire: true },
    });

    export const update: (p: IPlayer, mousePosition: Vector.Vector) => IPlayer =
        (p, t) => {
            const seeking = Game.seek(p, t);
            return Game.move(seeking) as IPlayer;
        };

    export const draw = (sketch: p5, { position }: IPlayer) => {
        const [x, y] = position;
        sketch.fill(0, 0, 255);
        sketch.ellipse(x, y, PLAYER_SIZE);
    };

}