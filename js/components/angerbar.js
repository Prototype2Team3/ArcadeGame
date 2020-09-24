class AngerBar extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.angerBar = this.scene.add.image(400, 750, 'anger_container');
        this.angerIcon = this.scene.add.image(335, 745, 'anger_icon');
        this.angerBlocks =[];
        this.angerBlock1 = this.scene.add.image(365, 750, 'anger_block');
        this.angerBlock2 = this.scene.add.image(383 , 750, 'anger_block');
        this.angerBlock3 = this.scene.add.image(401, 750, 'anger_block');
        this.angerBlock4 = this.scene.add.image(419, 750, 'anger_block');
        this.angerBlock5 = this.scene.add.image(437, 750, 'anger_block');
        this.angerBlocks.push(this.angerBlock1);
        this.angerBlocks.push(this.angerBlock2);
        this.angerBlocks.push(this.angerBlock3);
        this.angerBlocks.push(this.angerBlock4);
        this.angerBlocks.push(this.angerBlock5);

        this.angerBlocks.forEach((block) =>{
            block.setScale(0.75);
            block.visible = false;
        });

        this.scene.add.existing(this);

        emitter.on(G.TIME_UPDATED, this.timeUpdated, this);
    }
    
    timeUpdated()
    {
        //this.text1.setText("Money bar:" + model.score);
        if(model.timeElapsed >= 0 && model.timeElapsed < 5)
        {
            this.angerBlocks[0].visible = false;
            this.angerBlocks[1].visible = false;
            this.angerBlocks[2].visible = false;
            this.angerBlocks[3].visible = false;
            this.angerBlocks[4].visible = false;
        }
       else if(model.timeElapsed >= 5 && model.timeElapsed < 10 )
        {
            this.angerBlocks[0].visible = true;
            this.angerBlocks[1].visible = false;
            this.angerBlocks[2].visible = false;
            this.angerBlocks[3].visible = false;
            this.angerBlocks[4].visible = false;
        }
        else if(model.timeElapsed >= 10 && model.timeElapsed < 15)
        {
            this.angerBlocks[0].visible = true;
            this.angerBlocks[1].visible = true;
            this.angerBlocks[2].visible = false;
            this.angerBlocks[3].visible = false;
            this.angerBlocks[4].visible = false;
        }
        else if(model.timeElapsed >= 15 && model.timeElapsed < 20)
        {
            this.angerBlocks[0].visible = true;
            this.angerBlocks[1].visible = true;
            this.angerBlocks[2].visible = true;
            this.angerBlocks[3].visible = false;
            this.angerBlocks[4].visible = false;
        }
        else if(model.timeElapsed >= 20 && model.timeElapsed < 25)
        {
            this.angerBlocks[0].visible = true;
            this.angerBlocks[1].visible = true;
            this.angerBlocks[2].visible = true;
            this.angerBlocks[3].visible = true;
            this.angerBlocks[4].visible = false;
        }
       else if(model.timeElapsed >= 25 )
        {
            this.angerBlocks[0].visible = true;
            this.angerBlocks[1].visible = true;
            this.angerBlocks[2].visible = true;
            this.angerBlocks[3].visible = true;
            this.angerBlocks[4].visible = true;
        }
    }
}