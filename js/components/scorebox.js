class ScoreBox extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.counter = 0;

        this.moneyBar = this.scene.add.image(220, 50, 'money_container');
        this.startX = 70;
        this.interval = 3;

        this.moneyBlocks = this.scene.add.group();

        for (var i = 0; i < 100; i++)
        {
            var item = this.moneyBlocks.create(this.startX + (this.interval * i), 50, 'money_block', i);
            item.setScale(0.2, 1.5);  
        }
        this.scoreUpdated();
        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    
    scoreUpdated()
    {

        for(var i =0; i < 100; i++)
        {
            if(i < model.score)
            {
                this.moneyBlocks.children.entries[i].visible = true;
            }
            else
            {
                this.moneyBlocks.children.entries[i].visible = false;
            }
        }

    }
}