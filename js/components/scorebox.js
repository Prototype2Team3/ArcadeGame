class ScoreBox extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.progressBar = this.scene.add.graphics();
        this.progressBox = this.scene.add.graphics();
        this.progressBar.lineStyle(2, 0x000000);
        this.progressBox.fillStyle(0x222222, 0.5);
        this.progressBox.fillRect(50, 50, 105, 25);
        this.text1 = this.scene.add.text(0,50, "Money Bar");
        this.text1.setOrigin(0.5,0.5);
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    
    scoreUpdated()
    {
        //this.text1.setText("Money bar:" + model.score);
        if(model.score > 0)
        {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xff0000, 1);
            this.progressBar.fillRect(50, 50, model.score, 25);
        }
        else
        {
            this.progressBar.clear();
        }
    }
}