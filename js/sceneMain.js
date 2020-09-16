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
        this.board = new Board({scene:this}, this.add.graphics());
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
        var point = [this.input.activePointer.position.x, this.input.activePointer.position.y];
        for (let i = 0; i < this.board.Lanes.length; i++) 
        {
        
            this.boundary = this.board.Lanes[i];
            if (this.isInside(point, this.boundary)) {
              this.board.drawOccupiedLane(this.boundary, 0xfff000);
            }
        }
    }

    isInside(point, boundary) {
        let result = false;
        

        for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) 
        {
          if ((boundary[i][1] > point[1]) != (boundary[j][1] > point[1]) && (point[0] < (boundary[j][0] - boundary[i][0]) * (point[1] - boundary[i][1]) / (boundary[j][1] - boundary[i][1]) + boundary[i][0])) 
          {
            result = !result;
          }
        }
        return result;
      }
}