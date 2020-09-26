class AngerBar extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.angerBar = this.scene.add.image(400, 750, 'anger_container');
        this.angerIcon = this.scene.add.image(220, 745, 'anger_icon');
        this.startX = 250;
        this.interval = 3;

        this.angerBarBlocks = this.scene.add.group();

        for (var i = 0; i < 100; i++)
        {
            var item = this.angerBarBlocks.create(this.startX + (this.interval * i), 750, 'anger_block', i);
            item.setScale(0.2, 1.5);  
        }
        this.angerUpdated();

        this.scene.add.existing(this);

       // emitter.on(G.TIME_UPDATED, this.timeUpdated, this);
    }
    
    angerUpdated()
    {
        for(var i =0; i < 100; i++)
        {
            if(i < model.anger)
            {
                this.angerBarBlocks.children.entries[i].visible = true;
            }
            else
            {
                this.angerBarBlocks.children.entries[i].visible = false;
            }
        }
    }
}