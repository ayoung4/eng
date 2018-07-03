import * as _ from 'lodash';

import { Vector } from './vector';

export module Physics {

    export type Position = Vector.Vector;
    export type Velocity = Vector.Vector;
    export type Acceleration = Vector.Vector;

    export const MAX_VELOCITY = 2;
    export const MAX_ACCELERATION = 4;

    export interface IBody {
        position: Position,
        velocity: Velocity,
        acceleration: Acceleration,
    }

    export const Body: (position: Position, velocity?: Velocity, acceleration?: Acceleration) => IBody =
        (position, velocity = Vector.zero(), acceleration = Vector.zero()) => ({
            position,
            velocity,
            acceleration,
        });

    export const updateVelocity: (body: IBody) => IBody = (body) => {
        const newVelocity = Vector.add(body.velocity, body.acceleration);
        return {
            ...body,
            velocity: Vector.limit(newVelocity, MAX_VELOCITY),
        };
    };

    export const updatePosition: (body: IBody) => IBody = (body) => {
        const newPosition = Vector.subtract(body.position, body.velocity);
        return {
            ...body,
            position: newPosition,
        };
    };

    export const stopAcceleration: (body: IBody) => IBody = (body) => ({
        ...body,
        acceleration: Vector.zero(),
    });

    const applyAcceleration: (body: IBody, acceleration: Acceleration) => IBody =
        (body, acceleration) => {
            const desired = Vector.add(body.acceleration, acceleration);
            const steer = Vector.subtract(desired, body.velocity)
            return {
                ...body,
                acceleration: Vector.limit(steer, MAX_ACCELERATION),
            };
        };

    export const applySeek: (body: IBody, target: Position) => IBody =
        (body, target) => {
            const acceleration = Behaviors.seek(body.position, target);
            return applyAcceleration(body, acceleration);
        };

    export const applyFlee: (body: IBody, target: Position) => IBody =
        (body, target) => {
            const acceleration = Behaviors.flee(body.position, target);
            return applyAcceleration(body, acceleration);
        };

    export const applySeperate: (body: IBody, flock: IBody[]) => IBody =
        (body, flock) => {
            const targets = _.map(flock, ({ position }) => position);
            const acceleration = Behaviors.seperate(body.position, targets);
            return applyAcceleration(body, acceleration);
        };

    export const move: (body: IBody) => IBody = _.flow(
        updatePosition,
        updateVelocity,
        stopAcceleration,
    );

    module Behaviors {

        export const seek: (position: Position, target: Position, maxSpeed?: number) => Acceleration =
            (position, target, maxSpeed = MAX_VELOCITY) => {
                const desired = Vector.subtract(position, target);
                const distance = Vector.magnitude(desired);
                const speed = Math.abs(distance) > 30
                    ? maxSpeed
                    : 0;
                return Vector.ofMagnitude(desired, speed);
            };

        export const flee: (position: Position, target: Position, maxSpeed?: number) => Acceleration =
            (position, target, maxSpeed = MAX_VELOCITY) =>
                Vector.scale(seek(position, target, maxSpeed), -1);

        export const seperate: (position: Position, targets: Position[]) => Acceleration =
            (position, targets) => {
                const sum = _.reduce(targets, (s, target) => {
                    const steering = flee(position, target);
                    return Vector.add(s, steering);
                }, Vector.zero());
                return Vector.map(sum, (n) => n / targets.length);
            };

    }

}