class LevelBar extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.levelBar = this.scene.add.graphics();
        this.levelBox = this.scene.add.graphics();
        this.levelBox.fillStyle(0x222222, 0.12);
        this.levelBox.lineStyle(20, 0xffffff);
        this.levelBox.fillRect(50, 300, 25, 80);
        this.text2 = this.scene.add.text(0,50, "Level Bar");
        this.text2.setOrigin(0.5,0.5);
        this.add(this.text2);

        this.scene.add.existing(this);

        emitter.on(G.LEVEL_UPDATED, this.levelUpdated, this);
    }
    
    levelUpdated(level)
    {
            this.levelBar.clear();
            this.levelBar.fillStyle(0xffff00, 1);
            this.levelBar.fillRect(50, 300, 25, level * 10);
    }
}