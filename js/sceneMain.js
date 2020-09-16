class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//Load Images or Sounds here
    }
    create() {
        //Define objects
        this.graphics = this.add.graphics();
        this.board = new Board({scene:this}, this.graphics);
        this.shooter = new Shooter({scene:this}, this.graphics);
        this.board.makeLanes();
        this.board.drawLanes();
        //add physics
        
        this.input.mouse.capture = true;

    }
    update() {
        //Constant running loop
        //console.log(this.input.activePointer.position.x);
        this.movePointer();
    }

    movePointer()
    {
        this.board.clearBoard();
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

}