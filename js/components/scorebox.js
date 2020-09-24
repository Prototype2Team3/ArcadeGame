class ScoreBox extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene=config.scene;

        this.counter = 0;
        this.moneyBar = this.scene.add.image(150, 50, 'money_container');
        this.moneyBar.setScale(2, 1);

        this.moneySign1 = this.scene.add.image(100, 85, 'money_sign');
        this.moneySign2 = this.scene.add.image(150, 85, 'money_sign');
        this.moneySign3 = this.scene.add.image(200, 85, 'money_sign');
        this.updateDollars(model.moneySigns);

        this.moneyBlocks =[];
        this.moneyBlock1 = this.scene.add.image(60, 50, 'money_block');
        this.moneyBlock2 = this.scene.add.image(72, 50, 'money_block');
        this.moneyBlock3 = this.scene.add.image(84, 50, 'money_block');
        this.moneyBlock4 = this.scene.add.image(96, 50, 'money_block');
        this.moneyBlock5 = this.scene.add.image(108, 50, 'money_block');
        this.moneyBlock6 = this.scene.add.image(120, 50, 'money_block');
        this.moneyBlock7 = this.scene.add.image(132, 50, 'money_block');
        this.moneyBlock8 = this.scene.add.image(144, 50, 'money_block');
        this.moneyBlock9 = this.scene.add.image(156, 50, 'money_block');
        this.moneyBlock10 = this.scene.add.image(168, 50, 'money_block');
        this.moneyBlock11= this.scene.add.image(180, 50, 'money_block');
        this.moneyBlock12 = this.scene.add.image(192, 50, 'money_block');
        this.moneyBlock13 = this.scene.add.image(204, 50, 'money_block');
        this.moneyBlock14 = this.scene.add.image(216, 50, 'money_block');
        this.moneyBlock15 = this.scene.add.image(228, 50, 'money_block');
        this.moneyBlock16 = this.scene.add.image(240, 50, 'money_block');


        this.moneyBlocks.push(this.moneyBlock1);
        this.moneyBlocks.push(this.moneyBlock2);
        this.moneyBlocks.push(this.moneyBlock3);
        this.moneyBlocks.push(this.moneyBlock4);
        this.moneyBlocks.push(this.moneyBlock5);
        this.moneyBlocks.push(this.moneyBlock6);
        this.moneyBlocks.push(this.moneyBlock7);
        this.moneyBlocks.push(this.moneyBlock8);
        this.moneyBlocks.push(this.moneyBlock9);
        this.moneyBlocks.push(this.moneyBlock10);
        this.moneyBlocks.push(this.moneyBlock11);
        this.moneyBlocks.push(this.moneyBlock12);
        this.moneyBlocks.push(this.moneyBlock13);
        this.moneyBlocks.push(this.moneyBlock14);
        this.moneyBlocks.push(this.moneyBlock15);
        this.moneyBlocks.push(this.moneyBlock16);

        this.moneyBlocks.forEach((block) =>{
            block.setScale(0.65, 0.75);
            block.visible = false;
        });

        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    
    scoreUpdated()
    {
        if(model.score >= 5 && model.score < 10)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                if ( i != 0)
                {
                    this.moneyBlocks[i].visible = false;
                }
                else
                {
                    this.moneyBlocks[i].visible = true;
                }
            }
        }
       else if(model.score >= 10 && model.score < 15 )
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }
        }
        else if(model.score >= 15 && model.score < 20)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }
  
        }
        else if(model.score >=20 && model.score < 25)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }
        }
        else if(model.score >= 25 && model.score < 30)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }
            
        }
        else if(model.score >= 30 && model.score < 35)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }
            
        }
        else if(model.score >= 35 && model.score < 40)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 40 && model.score < 45)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 45 && model.score < 50)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 50 && model.score < 55)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 55 && model.score < 60)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 60 && model.score < 65)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 65 && model.score < 70)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 70 && model.score < 75)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 75 && model.score < 80)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                        this.moneyBlocks[i].visible = true;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
        else if(model.score >= 80 || model.score >= 0)
        {
            for (var i = 0; i < this.moneyBlocks.length; i++)
            {
                switch(i)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        this.moneyBlocks[i].visible = false;
                        break;
                    default:
                        this.moneyBlocks[i].visible = false;
                        break;
                }
            }       
        }
    }

    updateDollars(money)
    {
            switch (money)
            {
            case 0:
                this.moneySign1.visible = false;
                this.moneySign2.visible = false;
                this.moneySign3.visible = false;
                break;
            case 1:
                this.moneySign1.visible = true;
                this.moneySign2.visible = false;
                this.moneySign3.visible = false;
                break;
            case 2:
                this.moneySign1.visible = true;
                this.moneySign2.visible = true;
                this.moneySign3.visible = false;
                break;
            case 3:
                this.moneySign1.visible = true;
                this.moneySign2.visible = true;
                this.moneySign3.visible = true;
                break;
            default:
                this.moneySign1.visible = false;
                this.moneySign2.visible = false;
                this.moneySign3.visible = false;
                break;


            }
        }
}