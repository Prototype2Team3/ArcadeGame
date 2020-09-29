class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //Load Images or Sounds here
       
        this.load.image("background_vector", "images/VectorArt/Background.png");
        this.load.image("sofa", "images/VectorArt/Prop_Sofa.png");
        this.load.image("tv", "images/VectorArt/Prop_TV.png");
        this.load.image("book", "images/VectorArt/Prop_Book.png");
        this.load.image("chair", "images/VectorArt/Prop_Chair.png");
        this.load.image("shirt", "images/VectorArt/Prop_Cloth.png");
        this.load.image("table", "images/VectorArt/Prop_Table.png");
        this.load.image("controller", "images/VectorArt/Prop_Controller.png");
        this.load.image("cup", "images/VectorArt/Prop_Cup.png");
        this.load.image("lamp", "images/VectorArt/Prop_Lamp.png");
        this.load.image("keyboard", "images/VectorArt/Prop_Keyboard.png");
        this.load.image("house_vector", "images/VectorArt/House.png");
        this.load.image("character", "images/VectorArt/Character_T.png");
        this.load.image("anger_container", "images/VectorArt/AngerBar_Container.png");
        this.load.image("anger_icon", "images/VectorArt/AngerBar_Icon.png");
        this.load.image("anger_block", "images/VectorArt/AngerBar_Block.png");
        this.load.image("money_container", "images/VectorArt/MoneyBar_Container.png");
        this.load.image("money_sign", "images/VectorArt/MoneyBar_DollarSign.png");
        this.load.image("money_block", "images/VectorArt/MoneyBar_Block.png");
        
        this.load.image("knife", "images/VectorArt/Fatal_Knife.png");
        this.load.image("bat", "images/VectorArt/Fatal_Baseball_Bat.png");
        this.load.image("pan", "images/VectorArt/Fatal_Pan.png");
        this.load.image("phone", "images/VectorArt/Prop_Phone.png");
        this.load.image("camera", "images/VectorArt/Prop_Camera.png");
        this.load.image("cat", "images/VectorArt/Prop_Cat.png");
        this.load.image("ps4", "images/VectorArt/Prop_PS4.png");
        this.load.image("diamond", "images/VectorArt/Prop_Diamond.png");

        this.load.image("flower", "images/VectorArt/flower.png");

        this.load.spritesheet('smoke', "images/VectorArt/Spritesheet/BrokeAnimation_Spritesheet.png", {frameWidth: 40, frameHeight: 40});

        //load sounds
        this.load.audio('collect', 'sounds/Collect.wav');
        this.load.audio('missed', 'sounds/missed.wav');
        this.load.audio('throw', 'sounds/Throwing.wav');
        this.load.audio('main', 'sounds/BackgroundMusic.wav');

        

    }

    getTime() {
        //make a new date object
        let d = new Date();

        //return the number of milliseconds since 1 January 1970 00:00:00.
        return d.getTime();
    }

    create() {
        //Define objects
        // emitter = new Phaser.Events.EventEmitter();
        // controller = new Controller();
        model.score = 0;
        model.anger = 100;
        model.moneySigns = 0;
        model.timeElapsed = 0;


        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;
        this.start = this.getTime();

        //UI set up
        this.background = this.add.image(0,0, 'background_vector');
        this.background.setOrigin(0,0);
        this.house = this.add.image(400,400, 'house_vector');

        //this.circle = this.add.image(this.centerX,this.centerY, 'circle');
        //money bar
        this.sb = new ScoreBox({scene:this});
        this.sb.x = 100;
        this.sb.y = 50;
        //anger bar
        this.ab = new AngerBar({scene:this});
        this.ab.x = 400;
        this.ab.y = 700;
        //level bar
        // this.lb = new LevelBar({scene:this});
        // this.lb.x = 600;
        // this.lb.y = 50;


        //grid set up
        var gridConfig={scene:this}
        var alignGrid = new Grid(gridConfig);
        alignGrid.show();
        this.positions = alignGrid.movePositions();

        //character set up
        this.character = this.physics.add.sprite(this.positions[0].X, this.positions[0].Y, 'character');
        this.character.setScale(0.83);
        this.positionIndex = 0;
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-' + 'SPACE',this.handleActionButton, this);
        this.leftPressed = false;
        this.rightPressed = false;
        this.flower = this.add.image(100, 100, 'flower');
        this.flower.setScale(0.5);
        this.flower.visible = false;

        //game set up
        this.items = [];
        this.itemsSavedInRound = 0;
        this.itemsNeedToSavePerLevel = [12, 16, 20, 22, 25, 27, 31, 35, 0];
        this.delayByStage = [2000, 1500, 1250, 1100, 1000, 900, 800, 700, 650];
        this.stageIndx = 0;
        this.itemCreationEvent = this.time.addEvent({ delay: this.delayByStage[this.stageIndx], callback: this.handleItemCreation, callbackScope: this, loop: true });
        //this.time.addEvent({ delay: 1000, callback: this.handleGameTime, callbackScope: this, loop: true });
        this.isNotResting = true;
        this.gameStoped = false;

        this.smoke = this.add.sprite(100 , 100, "smoke");
        this.anims.create({
            key: 'break',
            frames: [
                {key: 'smoke', frame:0},
                {key: 'smoke', frame:1},
                {key: 'smoke', frame:2}
            ],
            frameRate: 5,
            repeat: 0
        });

        this.smoke.visible = false;

        //sounds
        this.collectSound=this.sound.add('collect', {volume: 0.2});
        this.missedSound=this.sound.add('missed', {volume: 0.2});
        this.throwSound=this.sound.add('throw', {volume: 0.2});
        this.mainSound=this.sound.add('main', {volume: 0.2});
        this.mainSound.loop = true;
        this.mainSound.play();


    }

    update() {
        //Constant running loop
        if(!this.gameStoped)
        {
            this.handlePlayerInput();
            this.handleObjectDestruction();
            this.handleDifficultyLevel();
            //this.handleScoreIncrease();
        }
    }

    handleItemCreation()
    {
        if(this.isNotResting && !this.gameStoped)
        {
            var msTimeTravel = 3000;
            var randomIdx = Math.floor(Math.random() * 16)
            var sprites = [ 'sofa', 'tv', 'book', 'chair', 'shirt', 'table', 'cup', 'controller', 'lamp', 'keyboard'];
            var fiascoModeItems = [ 'camera', 'phone', 'ps4', 'cat', 'diamond' , 'knife', 'bat', 'pan'];
            var randItem = this.stageIndx < 8? Math.floor(Math.random() * (sprites.length)) : Math.floor(Math.random() * (fiascoModeItems.length));
           //var randItem = Math.floor(Math.random() * (sprites.length));
            var item = this.physics.add.sprite(this.centerX, this.centerY, this.stageIndx < 8? sprites[randItem] : fiascoModeItems[randItem]);
            this.throwSound.play();
            item.setScale(0.83);
            this.physics.moveTo(item, this.positions[randomIdx].X, this.positions[randomIdx].Y, 1, msTimeTravel );
            this.physics.add.overlap(this.character, item , this.handleCollision, null, this);
    
            this.items.push(item);
        }

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
        if(elapsed > 80)
        {
    
            this.leftPressed = false;
            this.rightPressed = false;
        }

        this.character.body.position.x = this.positions[this.positionIndex].X - this.character.body.width/2;
        this.character.body.position.y = this.positions[this.positionIndex].Y - this.character.body.height/2 ;
    }

    handleCollision(character,item)
    {
        var isDeadly = item.texture.key == "knife" || item.texture.key == "bat" || item.texture.key == "pan";

        if(!isDeadly)
        {
            if(this.stageIndx < 8)
            {
                emitter.emit(G.UP_POINTS, 1);
            }
            else
            {
                emitter.emit(G.UP_POINTS, 5);
            }

            this.collectSound.play();
            this.itemsSavedInRound++;
        }
        else
        {
          this.EndGame(false);     
        }
   
        for(var i = 0; i < this.items.length; i++)
        {
           if(this.items[i] == item)
           {
               this.items.slice(this.items[i]);
           }
           
        }
       
       item.disableBody(true, true);
       
    }

    handleObjectDestruction()
    {
 
        var r = 300;
        for(var i = 0; i < this.items.length; i++)
        {
           if(this.items[i].body)
           {
            var d = Util.distanceTraveled([this.centerX, this.centerY], [this.items[i].body.position.x, this.items[i].body.position.y]);
            if ( d > r)
            {
                var item = this.items[i];
                this.items.slice(this.items[i]);

                var isDeadly = item.texture.key == "knife" || item.texture.key == "bat" || item.texture.key == "pan";

                if(!isDeadly)
                {
                    emitter.emit(G.DOWN_POINTS, 3);
                    this.missedSound.play();
                    if(model.score < 0)
                    {
                        
                        this.EndGame(false);
                    }
                }

                this.smoke.x = item.x;
                this.smoke.y = item.y;
                this.smoke.visible = true;
                this.smoke.play('break');

                this.time.addEvent({ delay: 300, callback: this.hideSmoke, callbackScope: this, loop: false });
                item.destroy();

            }
           }
           
        }
     
    }

    handleDifficultyLevel()
    {
        if(this.itemsNeedToSavePerLevel[this.stageIndx] == this.itemsSavedInRound)
        {
            if (this.stageIndx < 8)
            {
                this.stageIndx++;
                //this.lb.levelUpdated(this.stageIndx);
                this.itemCreationEvent.delay = this.delayByStage[this.stageIndx];
                this.itemsSavedInRound = 0;

            }
        }

        //fiasco mode
        if(this.stageIndx == 8)
        {
            console.log("fiasco mode");
            this.itemCreationEvent.delay = this.delayByStage[this.stageIndx];
        }
    }

    handleScoreIncrease()
    {
      
    }

    handleActionButton()
    {
        if(!(model.score - 2 < 0))
        {
            model.score -=2;
            model.anger -=1;

            this.flower.x = this.character.x + 30;
            this.flower.y = this.character.y - 40;
            this.flower.visible = true

            this.time.addEvent({ delay: 300, callback: this.hideFlower, callbackScope: this, loop: false });
        }

        this.ab.angerUpdated();

        if(model.anger <= 0)
        {
            this.EndGame(true);
        }
    }

    //can probably do both of this with one method
    hideFlower()
    {
        this.flower.visible = false;
    }

    hideSmoke()
    {
        this.smoke.visible = false;
    }
    /*******************/


    EndGame(playerWin)
    {
        this.gameStoped = true;
        this.mainSound.stop();
        // this.items.forEach((item) => {
        //     item.destroy();
        // });

        //determine which next scene to go to;

        playerWin? this.scene.start('SceneWin') : this.scene.start('SceneLose');

    }
}