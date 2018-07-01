import * as _ from 'lodash';
import * as p5 from 'p5';

import { Enemy } from './enemy';
import { Vector } from './vector';
import { Player } from './player';
import { Game } from './game';

const sketch = new p5(function (sketch: p5) {

    let enemies = [
        Enemy.Enemy(),
    ];

    let player = Player.Player();

    const drawEnemy = _.partial(Enemy.draw, sketch);
    const drawPlayer = _.partial(Player.draw, sketch);

    sketch.setup = function () {
        sketch.createCanvas(Game.WIDTH, Game.HEIGHT);
    }

    sketch.draw = function () {
        sketch.background(100, 165, 100, 255);

        enemies = _.map(enemies, (e) => Enemy.update(e, player));
        
        const mousePosition: Vector.Vector = [sketch.mouseX, sketch.mouseY];
        player = Player.update(player, mousePosition);
        
        _.forEach(enemies, drawEnemy);
        
        drawPlayer(player);

        if (p5.keyPressed) {
            switch (p5.key) {
                case 'w':
                    player.velocity = [0, 1];
                    break;
                case 'a':
                    player.velocity = [1, 0];
                    break;
                case 's':
                    player.velocity = [0, -1];
                    break;
                case 'd':
                    player.velocity = [-1, 0];
                    break;
            }
        } else {
            player.velocity = [0, 0];
        }
    }

});