class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //Load Images or Sounds here
        this.load.image("character", "images/character/front.png");
        this.load.image("chair", "images/furniture/chair.png");
        this.load.image("table", "images/furniture/table.png");
        this.load.image("tv", "images/furniture/TV.png");
        this.load.image("background", "images/scene.png");
    }

    getTime() {
        //make a new date object
        let d = new Date();

        //return the number of milliseconds since 1 January 1970 00:00:00.
        return d.getTime();
    }

    create() {
        //Define objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0,0, 'background');
        this.background.setOrigin(0,0);
        var gridConfig={scene:this}
        var alignGrid = new Grid(gridConfig);
        alignGrid.show();
        this.positions = alignGrid.movePositions();

        //character set up
        this.character = this.physics.add.sprite(this.positions[0].X, this.positions[0].Y, 'character');
        this.character.setScale(0.83);
        this.positionIndex = 0;
        cursors = this.input.keyboard.createCursorKeys();
        this.actionButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.leftPressed = false;
        this.rightPressed = false;

        this.items = [];
        this.time.addEvent({ delay: 1000, callback: this.handleItemCreation, callbackScope: this, loop: true });

    }

    update() {
        //Constant running loop
        this.handlePlayerInput();
        this.handleObjectDestruction();
    }

    handleItemCreation()
    {
        var msTimeTravel = 3000;
        var randomIdx = Math.floor(Math.random() * 16)
        var sprites = ['chair', 'table', 'tv'];
        var randItem = Math.floor(Math.random() * sprites.length);
        var item = this.physics.add.sprite(this.centerX, this.centerY, sprites[randItem]);
        item.setScale(0.83);
        this.physics.moveTo(item, this.positions[randomIdx].X, this.positions[randomIdx].Y, 1, msTimeTravel );
        this.physics.add.overlap(this.character, item , this.handleCollision, null, this);

        this.items.push(item);

    }

    handlePlayerInput()
    {

        if (cursors.left.isDown && this.leftPressed == false)
        {
            this.leftPressed = true;
            this.downtime=this.getTime();
           this.positionIndex > 0? this.positionIndex-- : this.positionIndex = this.positions.length - 1;
        }
        else if (cursors.right.isDown && this.rightPressed == false)
        {
            this.rightPressed = true;
            this.downtime=this.getTime();
            this.positionIndex < this.positions.length - 1? this.positionIndex++ : this.positionIndex = 0;
        }
        
        if ( !cursors.left.isDown && this.leftPressed == true)
        {
            this.leftPressed = false;
            
        }

        if ( !cursors.left.isDown && this.rightPressed == true)
        {
            this.leftPressed = false;
            
        }

        var elapsed = Math.abs(this.downtime - this.getTime());
        if(elapsed > 60)
        {
    
            this.leftPressed = false;
            this.rightPressed = false;
        }

        this.character.body.position.x = this.positions[this.positionIndex].X - this.character.body.width/2;
        this.character.body.position.y = this.positions[this.positionIndex].Y - this.character.body.height/2 ;
    }

    handleCollision(character,item)
    {
        //TODO: in here handle what happens when item ovelaps with player
   
        for(var i = 0; i < this.items.length; i++)
        {
           if(this.items[i] == item)
           {
               this.items.slice(this.items[i]);
           }
           
        }
       //item.destroy();
       item.disableBody(true, true);
    }

    handleObjectDestruction()
    {
 
        var r = 300;
        for(var i = 0; i < this.items.length; i++)
        {
           
            var d = Util.distanceTraveled([this.centerX, this.centerY], [this.items[i].body.position.x, this.items[i].body.position.y]);
            if ( d > r)
            {
                var item = this.items[i];
                this.items.slice(this.items[i]);

                item.disableBody(true, true);

                

            }
        }
     
    }
}