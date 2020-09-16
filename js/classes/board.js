class Board extends Phaser.GameObjects.Container
{
    constructor(config, graphics)
    {
        super(config.scene)
        this.scene = config.scene;
        this.graphics = graphics;
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

    defineTubes()
    {
        this.tubeQuads = [];
        for (let i = 0; i < this.shape[0].length - 1; i++) {
          this.tubeQuads.push([
            this.shape[0][i],
            this.shape[0][i + 1],
            this.shape[1][i + 1],
            this.shape[1][i],
          ]);
        }
        //this.tubeCenter = Util.tubeCenter(tubeShape);
    }

    drawTubeQuads() {
        this.graphics.lineStyle(4, 0xff0000);
    
        for (let i = 0; i < this.tubeQuads.length; i++) {
          const tubeQuad = this.tubeQuads[i];
          console.log(tubeQuad)
          this.graphics.beginPath();
          
          this.graphics.moveTo(...tubeQuad[0]);
          this.graphics.lineTo(...tubeQuad[1]);
          this.graphics.lineTo(...tubeQuad[2]);
          this.graphics.lineTo(...tubeQuad[3]);
          this.graphics.closePath();
          this.graphics.strokePath();
        }
      }
}