class LevelBar extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;
        this.text = this.scene.add.text(0,0, "Level 0");
        this.add(this.text);

        this.scene.add.existing(this);

        emitter.on(G.LEVEL_UPDATED, this.levelUpdated, this);
    }
    
    levelUpdated(level)
    {
        level >= 8 ? this.text.setText("FIASCO MODE") : this.text.setText("Level " + level);
    }
}