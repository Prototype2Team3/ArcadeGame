class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //Load Images or Sounds here
        this.load.image("character", "images/img.png");
        this.load.image("items", "images/img.png");
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
        this.character = this.physics.add.sprite(this.positions[0].X, this.positions[0].Y, 'character');
        this.positionIndex = 0;
        this.moveCounter = 0;
        cursors = this.input.keyboard.createCursorKeys();
		this.actionButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //******AI set up a group for items thrown *****************************************************************************//
        this.itemGroup= this.physics.add.group({
            key: 'items',
            frame: [0,1,2],
            frameQuantity: 4,
            collideWorldBounds: false
        });
        this.itemGroup.children.iterate(function(child){
         child.x = this.centerX;
         child.y = this.centerY;
         var msTimeTravel = 4000;
         var randomIdx = Math.floor(Math.random() * 16)

         child.setScale(0.5)
         this.physics.moveTo(child, this.positions[randomIdx].X, this.positions[randomIdx].Y, 1, msTimeTravel );

        }.bind(this));
        //set up a collider 
        this.physics.add.overlap(this.character, this.itemGroup, this.handleCollision, null, this);
/*********************************************************************************************************************** */
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

    handleCollision(character,item)
    {
        //TODO: in here handle what happens when item ovelaps with player
     
        item.destroy();
    }

    canMove(){
        if(this.moveCounter <= 0)
        {
            this.moveCounter = 8;
            return true;
        }
        this.moveCounter--;

        return false;
    }
}