class SceneWin extends Phaser.Scene {
    constructor() {
        super('SceneWin');
    }
    preload()
    {
        this.load.image("win_back", "images/VectorArt/Winning_Screen.png");
        this.load.image("play_btn", "images/VectorArt/AgainButton2.png");
    }
    create() {
        console.log("SceneTitle!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.background = this.add.image(0,0, 'win_back');
        this.background.setOrigin(0,0);

        this.startButton = new Button({scene:this, key: 'play_btn', text:'', x: 400, y: 750, event: 'play_pressed', params: 'play_again'});

        emitter.on('play_pressed', this.playPressed, this);

    }

    playPressed()
    {
        this.scene.start('SceneMain');
    }


    update() {}
}
