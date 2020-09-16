var game;
var emitter;
var G;
var model;
var controller;

window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [SceneMain]
    }

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}