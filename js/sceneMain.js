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
        this.load.image("house_vector", "images/VectorArt/House.png");
        this.load.image("character", "images/VectorArt/Character_T.png");
        this.load.image("anger_container", "images/VectorArt/AngerBar_Container.png");
        this.load.image("anger_icon", "images/VectorArt/AngerBar_Icon.png");
        this.load.image("anger_block", "images/VectorArt/AngerBar_Block.png");
        this.load.image("money_container", "images/VectorArt/MoneyBar_Container.png");
        this.load.image("money_sign", "images/VectorArt/MoneyBar_DollarSign.png");
        this.load.image("money_block", "images/VectorArt/MoneyBar_Block.png");

        this.load.image("flower", "images/VectorArt/flower.png")

        this.load.image("knife", "images/furniture/knife.png");

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
        model.score = 0;
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
            var sprites = [ 'sofa', 'tv' , 'knife'];
            var randItem = this.stageIndx < 8? Math.floor(Math.random() * (sprites.length - 1)) : Math.floor(Math.random() * (sprites.length));
           //var randItem = Math.floor(Math.random() * (sprites.length));
            var item = this.physics.add.sprite(this.centerX, this.centerY, sprites[randItem]);
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

        if(item.texture.key != "knife")
        {
            if(this.stageIndx < 8)
            {
                emitter.emit(G.UP_POINTS, 1);
            }
            else
            {
                emitter.emit(G.UP_POINTS, 5);
            }
            this.itemsSavedInRound++;
        }
        else 
        {
          this.EndGame();     
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

                if(item.texture.key != "knife")
                {
                    emitter.emit(G.DOWN_POINTS, 3);
                    if(model.score < 0)
                    {
                        
                        this.EndGame();
                    }
                }
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
            this.EndGame();
        }
    }

    hideFlower()
    {
        this.flower.visible = false;
    }

    EndGame()
    {
        this.gameStoped = true;
        this.items.forEach((item) => {
            item.destroy();
        });

        //determine which next scene to go to;

    }
}