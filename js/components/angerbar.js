class AngerBar extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.angerBar = this.scene.add.graphics();
        this.angerBox = this.scene.add.graphics();
        this.angerBar.lineStyle(2, 0x000000);
        this.angerBox.fillStyle(0x222222, 0.5);
        this.angerBox.fillRect(275, 750, 250, 25);
        this.text2 = this.scene.add.text(0,50, "Anger Bar");
        this.text2.setOrigin(0.5,0.5);
        this.add(this.text2);

        this.scene.add.existing(this);

        emitter.on(G.TIME_UPDATED, this.timeUpdated, this);
    }
    
    timeUpdated()
    {
        //this.text1.setText("Money bar:" + model.score);
        if(model.timeElapsed > 0 && model.timeElapsed <= 8)
        {
            this.angerBar.clear();
            this.angerBar.fillStyle(0xffff00, 1);
            this.angerBar.fillRect(275, 750, model.timeElapsed * 10, 25);
        }
        else if (model.timeElapsed > 8 && model.timeElapsed <= 20)
        {
            this.angerBar.clear();
            this.angerBar.fillStyle(0xffa500, 1);
            this.angerBar.fillRect(275, 750, model.timeElapsed * 10, 25);
        }
        else if (model.timeElapsed > 20 && model.timeElapsed < 26)
        {
            this.angerBar.clear();
            this.angerBar.fillStyle(0xff0000, 1);
            this.angerBar.fillRect(275, 750, model.timeElapsed * 10, 25);
        }
        else
        {
            this.angerBar.clear();
        }
    }
}