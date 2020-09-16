class Bullet extends Phaser.GameObjects.Container
{
    constructor(config, graphics, physics, lane)
    {
        super(config.scene)
        this.graphics = graphics;
        this.physics = physics;
        this.zPos = 0;
        this.scene.add.existing(this);
        this.Lane = lane;
        
    }

    draw() {


        //this.graphics.lineStyle(8, 0xff0000);
        this.graphics.fillStyle(0xff0000, 1.0);
        this.graphics.beginPath();
        const start = Util.midpoint(this.Lane[0], this.Lane[1]);
        const end = Util.midpoint(this.Lane[2], this.Lane[3]);
        const easeFraction = Util.travelOutLane(this.zPos / 120);
        const distanceInLane = Util.vector(start, end, easeFraction);
        const pos = Util.addVector(start, distanceInLane);
        this.graphics.arc(
          pos[0], pos[1], 3 * (1 - easeFraction) + 1, 0, 2 * Math.PI, true
        );
        this.graphics.fillPath();

        // const start = Util.midpoint(Lane[0], Lane[1]);
        // this.physicsObject = this.physics.add.sprite(start[0], start[1], 'bullet');
        // Align.scaletoGame(this.physicsObject, 0.025);
    }

    move() 
    {
        // const start = Util.midpoint(Lane[0], Lane[1]);
        // const end = Util.midpoint(Lane[2], Lane[3]);
        // this.physicsObject.body.setVelocity(Util.vector(start, end)[0] * 1, Util.vector(start, end)[1] * 1);
        this.zPos += 3;
        if (this.zPos > 120) 
        {
            this.destroy();
          return false;
        }

        return true;
    }
}