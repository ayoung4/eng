import * as _ from 'lodash';
import { Physics } from './physics';
import { Vector } from './vector';

export module Game {

    export const WIDTH = 500;
    export const HEIGHT = 500;

    export interface IGameObj {
        body: Physics.IBody;
    }

    export interface ICharacter extends IGameObj {
        health: number;
    }

}