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
        var board = new Board({scene:this}, this.add.graphics());
        board.defineTubes();
        board.drawTubeQuads();
    }
    update() {
        //Constant running loop
    }
}