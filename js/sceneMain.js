class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
        this.bullets = [];
        this.enemies = [];
    }
    preload()
    {
      //Load Images or Sounds here
      this.load.image("bullet", "images/bullet.png");
    }

    create() {
        //Define objects
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller;

        this.graphics = this.add.graphics();
        this.board = new Board({scene:this}, this.graphics);
        this.shooter = new Shooter({scene:this}, this.graphics, this.emitter);
        this.board.makeLanes();
        this.board.drawLanes();
        //add physics
       

        this.time.addEvent({ delay: 700, callback: this.handleEnemyCreation, callbackScope: this, loop: true });

        this.input.mouse.capture = true;

        window.addEventListener("mousedown", () => {
          var bullet = this.shooter.fire(this.board.currentLane, this.physics)
          if(this.bullets.length < 8 )
          {
            this.bullets.push(bullet);
          }
          bullet = null;
        });

    }



    update() {
        //Constant running loop
        this.board.clearBoard();
        this.movePointer();
        this.drawBullets();

        for(var i =0; i < this.enemies.length; i++)
        {
          this.enemies[i].draw(this.graphics, this.board.laneCenter);
        }

        this.checkCollisions();


    }

    handleEnemyCreation()
    {

        this.enemies.push(new Enemy({scene:this}, this.graphics, this.board.Lanes));

    }

    drawBullets()
    {
      if (this.bullets.length > 0)
      {
        this.bullets.forEach(element => {
          element.draw(this.board.currentLane);
          if (element.move())
          {
            return;
          }
          else
          {
            this.bullets.splice(element, 1);
            element = null;
          }
        });

      }

    }

    movePointer()
    {
       this.board.drawLanes();
        var point = [this.input.activePointer.position.x, this.input.activePointer.position.y];
        for (let i = 0; i < this.board.Lanes.length; i++) 
        {
            this.boundary = this.board.Lanes[i];
            if (Util.isInside(point, this.boundary)) {
              this.board.drawOccupiedLane(this.boundary, 0xfff000);
              this.shooter.draw(this.boundary, 0xfff000);
            }
        }
    }

    checkCollisions() {
      for (let i = 0; i < this.enemies.length; i++) {
        for (let j = 0; j < this.bullets.length; j++) {
          const enemy = this.enemies[i];
          const bullet = this.bullets[j];
          if (enemy)
          {
            if (enemy.collidedWith(bullet)) {
              this.enemies.splice(enemy, 1);
            }
          }
        }
      }
    }

}