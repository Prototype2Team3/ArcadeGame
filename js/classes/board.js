class Board extends Phaser.GameObjects.Container
{
    constructor(config, graphics)
    {
        super(config.scene)
        this.scene = config.scene;
        this.graphics = graphics;
        this.currentLane;
       
        this.center = null;
        this.shape = [
            [
              [256, 60],
              [316, 73],
              [368, 108],
              [403, 160],
              [416, 221],
              [403, 281],
              [368, 334],
              [315, 368],
              [256, 381],
              [195, 368],
              [143, 334],
              [108, 281],
              [95, 221],
              [108, 160],
              [143, 108],
              [195, 73],
              [256, 60],
            ],
            [
              [256, 255],
              [264, 257],
              [273, 262],
              [277, 270],
              [280, 279],
              [277, 289],
              [273, 296],
              [264, 301],
              [256, 303],
              [247, 301],
              [238, 296],
              [234, 289],
              [231, 279],
              [234, 270],
              [238, 262],
              [247, 257],
              [256, 255],
            ]
          ];

        this.scene.add.existing(this);
    }

    makeLanes()
    {
        this.Lanes = [];
        for (let i = 0; i < this.shape[0].length - 1; i++) {
          this.Lanes.push([
            this.shape[0][i],
            this.shape[0][i + 1],
            this.shape[1][i + 1],
            this.shape[1][i],
          ]);
        }
    }

    drawLanes() {
        this.graphics.lineStyle(4, 0xff0000);
    
        for (let i = 0; i < this.Lanes.length; i++) {
          const Lane = this.Lanes[i];
          this.graphics.beginPath();
          
          this.graphics.moveTo(...Lane[0]);
          this.graphics.lineTo(...Lane[1]);
          this.graphics.lineTo(...Lane[2]);
          this.graphics.lineTo(...Lane[3]);
          this.graphics.closePath();
          this.graphics.strokePath();
        }
      }

      drawOccupiedLane(occupiedLane , color ) {
        this.currentLane = occupiedLane;
        //TODO: find better logic for this method

          for (let i = 0; i < this.Lanes.length; i++) {
            const lane = this.Lanes[i];

            if (occupiedLane != lane)
            {
                this.graphics.lineStyle(4, 0xff0000);
                this.graphics.beginPath();
                
                this.graphics.moveTo(...lane[0]);
                this.graphics.lineTo(...lane[1]);
                this.graphics.lineTo(...lane[2]);
                this.graphics.lineTo(...lane[3]);
                this.graphics.closePath();
                this.graphics.strokePath();
            }
          }

          this.graphics.lineStyle(4, color);

        this.graphics.beginPath();
          
          this.graphics.moveTo(...occupiedLane[0]);
          this.graphics.lineTo(...occupiedLane[1]);
          this.graphics.lineTo(...occupiedLane[2]);
          this.graphics.lineTo(...occupiedLane[3]);
          this.graphics.closePath();
          this.graphics.strokePath();

      }


      clearBoard()
      {
        this.graphics.lineStyle(0x000000);
        this.graphics.fillStyle(0x000000);
        this.graphics.fillRect(0, 0, game.config.width, game.config.height);
        this.graphics.strokeRect(0, 0, game.config.width, game.config.height);
      }
}