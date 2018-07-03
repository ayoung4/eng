import * as _ from 'lodash';
import * as p5 from 'p5';

import { Enemy } from './enemy';
import { Vector } from './vector';
import { Player } from './player';
import { Game } from './game';

const sketch = new p5(function (sketch: p5) {

    let enemies = [Enemy.Enemy()];

    let player = Player.Player();

    const drawEnemy = _.partial(Enemy.draw, sketch);
    const drawPlayer = _.partial(Player.draw, sketch);

    sketch.setup = function () {
        // sketch.frameRate(20);
        sketch.createCanvas(Game.WIDTH, Game.HEIGHT);
    }

    sketch.draw = function () {

        sketch.background(100, 165, 100);
        _.forEach(enemies, drawEnemy);
        drawPlayer(player);

        if (sketch.frameCount % 150 === 0) {
            enemies.push(Enemy.Enemy());
        }

        enemies = _.map(enemies, (e) => Enemy.update(e, player));

        const mousePosition = Vector.wrap(sketch.mouseX, sketch.mouseY);

        player = Player.update(player, mousePosition);

    }

});