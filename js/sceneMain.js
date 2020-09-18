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


        //this.background = this.add.image(0,0, 'images/background');
        //this.background.setOrigin(0,0);
        var gridConfig={scene:this}
        var alignGrid = new Grid(gridConfig);
        alignGrid.show();
        this.positions = alignGrid.movePositions();

        //character set up
        this.character = this.physics.add.sprite(this.positions[0].X, this.positions[0].Y, 'images/bullet');
        this.positionIndex = 0;
        this.moveCounter = 0;
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        //Constant running loop
        this.handlePlayerInput();
    }

    handlePlayerInput()
    {

    if(this.canMove())
    {
        if (cursors.left.isDown)
        {
            this.positionIndex > 0? this.positionIndex-- : this.positionIndex = this.positions.length - 1;
        }
        else if (cursors.right.isDown)
        {
            this.positionIndex < this.positions.length - 1? this.positionIndex++ : this.positionIndex = 0;
        }
        this.character.body.position.x = this.positions[this.positionIndex].X - this.character.body.width/2;
        this.character.body.position.y = this.positions[this.positionIndex].Y - this.character.body.height/2 ;
        }
    }

    canMove(){
        if(this.moveCounter <= 0)
        {
            this.moveCounter = 10;
            return true;
        }
        this.moveCounter--;

        return false;
    }
}