class Shooter extends Phaser.GameObjects.Container
{
    constructor(config, graphics)
    {
        super(config.scene)
        this.graphics = graphics;
        //might need to determine this a different way
         this.positionX = 0;

         this.scene.add.existing(this);
        
    }

    draw(Lane, color)
      {
        const posRimFlexible = Util.weightedMidpoint(Lane[0], Lane[1],  1 / 8);
        const posRimLeft = Util.weightedMidpoint(Lane[0], Lane[1], 0.9);
        const posRimMidLeft = Util.weightedMidpoint(Lane[0], Lane[1], 0.6);
        const posRimMidRight = Util.weightedMidpoint(Lane[0], Lane[1], 0.4);
        const posRimRight = Util.weightedMidpoint(Lane[0], Lane[1], 0.1);
        const toClawBack = Util.orthogonalUnitVector(Lane[0], Lane[1], 10);
        const posClawBackOuter = Util.addVector(posRimFlexible, toClawBack, 2);
        const posClawBackInner = Util.addVector(posRimFlexible, toClawBack);
        const posClawPointLeft = Util.addVector(posRimMidLeft, toClawBack, -1);
        const posClawPointRight = Util.addVector(posRimMidRight, toClawBack, -1);

    
        this.graphics.lineStyle(4, color);

        this.graphics.beginPath();
        this.graphics.moveTo(...Lane[0]);
        this.graphics.lineTo(...posClawBackOuter);
        this.graphics.lineTo(...Lane[1]);
        this.graphics.lineTo(...posClawPointLeft);
        this.graphics.lineTo(...posRimLeft);
        this.graphics.lineTo(...posClawBackInner);
        this.graphics.lineTo(...posRimRight);
        this.graphics.lineTo(...posClawPointRight);
        this.graphics.closePath();
        this.graphics.strokePath();
      }
}