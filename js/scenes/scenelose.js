class SceneLose extends Phaser.Scene {
    constructor() {
        super('SceneLose');
    }
    preload()
    {
        this.load.image("lose_back", "images/VectorArt/Losing_Screen.png");
        this.load.image("play_btn", "images/VectorArt/button.png");
    }
    create() {
        console.log("SceneLoose!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.background = this.add.image(0,0, 'lose_back');
        this.background.setOrigin(0,0);

        this.startButton = new Button({scene:this, key: 'play_btn', text:'Play AGAIN', x: 400, y: 750, event: 'play_pressed', params: 'play_again'});

        emitter.on('play_pressed', this.playPressed, this);
        
    }

    playPressed()
    {
        this.scene.start('SceneMain');

    }


    update() {}
}