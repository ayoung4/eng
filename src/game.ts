import { Vector } from './vector';
import * as _ from 'lodash';

export module Game {

    export const WIDTH = 500;
    export const HEIGHT = 500;

    export interface IGameObj {
        position: Vector.Vector,
        velocity: Vector.Vector,
        acceleration: Vector.Vector,
    }

    const MAX_SPEED = 2;
    const MAX_FORCE = 0.2;

    const limitVelocity = Vector.limiterOf(MAX_SPEED);
    const limitAcceleration = Vector.limiterOf(MAX_FORCE);

    const applyAcceleration = _.flow(Vector.add, limitVelocity);
    const applySteering = _.flow(Vector.add, limitVelocity);

    export const move: (obj: IGameObj) => IGameObj =
        (obj) => {
            const velocity = applyAcceleration(obj.velocity, obj.acceleration);
            const position = Vector.subtract(obj.position, velocity);
            return {
                ...obj,
                velocity,
                position,
            };
        };

    export const seek: (obj1: IGameObj, position: Vector.Vector) => IGameObj =
        (obj1, position) => {
            const steering = Vector.findSteering(obj1.position, position, obj1.velocity, MAX_SPEED);
            const acceleration = applySteering(obj1.acceleration, steering);
            return {
                ...obj1,
                acceleration,
            };
        };

    export interface ICharacter extends IGameObj {
        health: number;
    }

}