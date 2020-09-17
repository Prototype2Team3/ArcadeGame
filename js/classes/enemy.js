class Enemy extends Phaser.GameObjects.Container
{
    constructor(config, graphics, lanes)
    {
        super(config.scene);
        this.graphics - graphics;
        this.MAXZ_POS = 120;
        this.zPos = this.MAXZ_POS;
        this.wait = 10;
        this.waiting = 0;
        this.Lanes = lanes;
        this.Lane =lanes[Math.floor(lanes.length * Math.random())];
        this.maxNumEnemyBullets = 10;
        this.xVel = Math.random() < 0.5 ? -1 : 1;
        this.xPos = 7 + Math.floor(7 / 2)

        this.scene.add.existing(this);
    }

    // preUpdate(time, delta)
    // {
    //     this.draw(this.Lane);

    // }

    draw(graphics, laneCenter) {
       this.xPosInLane = this.xPos % 7;
       this.LaneIdx = Math.floor(this.xPos / 7);
        
       //graphics.fillStyle(0xFF0000, 1.0);
       graphics.lineStyle(3, '0xFF0000');
        graphics.beginPath();

        //this is just to draw and I think some of it is wrong
        //for the next iteration we using a sprite this will not be necessary
        const easeFraction = Util.travelOutLane(this.zPos / this.MAXZ_POS);
        const toRimRight = Util.vector(this.Lane[0], this.Lane[3], easeFraction);
        const toRimLeft = Util.vector(this.Lane[1], this.Lane[2], easeFraction);
        let posPivotRight = Util.addVector(this.Lane[0], toRimRight);
        let posPivotLeft = Util.addVector(this.Lane[1], toRimLeft);
        let orthogonalVector;
        const orthogonalHeight = 15 * (1 - 0.9 * easeFraction);
        let theta;
        const midFlip = Math.floor(7/ 2);
        if (this.xPosInLane > midFlip) {
          theta = Util.theta(this.Lane[0], this.Lane[1], laneCenter);
          theta *= -2 * (this.xPosInLane - midFlip) / 7;
          orthogonalVector = Util.orthogonalUnitVector(posPivotRight, posPivotLeft, orthogonalHeight);
          posPivotRight = Util.rotateAroundPoint(posPivotRight, posPivotLeft, theta);
          orthogonalVector = Util.rotateAroundPoint(orthogonalVector, [0, 0], theta);
        } else {
          theta = Util.theta(laneCenter, this.Lane[0], this.Lane[1]);
         theta *= -2 * (this.xPosInLane - midFlip) / 7;
         orthogonalVector = Util.orthogonalUnitVector(posPivotRight, posPivotLeft, -orthogonalHeight);
         posPivotLeft = Util.rotateAroundPoint(posPivotLeft, posPivotRight, theta);
         orthogonalVector = Util.rotateAroundPoint(orthogonalVector, [0, 0], theta);
        }
        const posCornerRight = Util.addVector(Util.weightedMidpoint(posPivotRight, posPivotLeft, 0.1), orthogonalVector);
        const posCreaseRight = Util.addVector(Util.weightedMidpoint(posPivotRight, posPivotLeft, 0.2), orthogonalVector, 0.5);
        const posCreaseLeft = Util.addVector(Util.weightedMidpoint(posPivotRight, posPivotLeft, 0.8), orthogonalVector, 0.5);
        const posCornerLeft = Util.addVector(Util.weightedMidpoint(posPivotRight, posPivotLeft, 0.9), orthogonalVector);

        graphics.moveTo(...posPivotRight);
        graphics.lineTo(...posCornerLeft);
        graphics.lineTo(...posCreaseLeft);
        graphics.lineTo(...posPivotLeft);
        graphics.lineTo(...posCornerRight);
        graphics.lineTo(...posCreaseRight);
        graphics.closePath();
        graphics.strokePath();

        this.move();
      }

      move() {
        
          if (this.zPos > 0) {
            this.zPos -= 1;
          }
      }
    
}