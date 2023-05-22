import { Scene01 as Scene01 } from "./src/scenes/Scene01.js"

var config = {

    type: Phaser.AUTO,
    width: 800, height: 600,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 600 },
        debug: false
        }},
    scene: [ Scene01 ]
};

new Phaser.Game(config);