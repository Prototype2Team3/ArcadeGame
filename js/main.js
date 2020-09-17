var game;
var model;
var emitter;
var controller;
var cursors;
var G;
window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 1200 ,
        height: 800,
        parent: 'phaser-game',
        scene: [SceneMain]
    }

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}