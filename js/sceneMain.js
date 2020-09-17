class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//Load Images or Sounds here
    }
    create() {
        //Define objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        var gridConfig={scene:this}
        var alignGrid = new Grid(gridConfig);
        alignGrid.show();
        alignGrid.movePositions();

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //Constant running loop

    if (cursors.left.isDown)
    {
        console.log("moving left")
    }
    else if (cursors.right.isDown)
    {
        console.log("moving right")
    }
    }
}