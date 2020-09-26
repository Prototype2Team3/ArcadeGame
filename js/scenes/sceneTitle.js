class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("background", "images/VectorArt/TitleScreen_Background.png");
        this.load.image("start_btn", "images/VectorArt/button.png");
    }
    create() {
        console.log("SceneTitle!");
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.background = this.add.image(0,0, 'background');
        this.background.setScale(0.75);
        this.background.setOrigin(0,0);

        this.startButton = new Button({scene:this, key: 'start_btn', text:'START', x: 400, y: 750, event: 'button_pressed', params: 'start'});

        emitter.on('button_pressed', this.startPressed, this);
        
    }

    startPressed()
    {
        this.scene.start('SceneMain');

    }


    update() {}
}