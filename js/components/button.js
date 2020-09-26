class Button extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        super(config.scene);
        this.scene = config.scene;

        this.config = config;
        if(config.key)
        {
            console.log(config.key)
            this.back = this.scene.add.image(0,0, config.key);
            this.add(this.back);

        }

        if (config.text)
        {
            console.log(config.text)
            this.text1 = this.scene.add.text(0, 0, config.text);
            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1);
        }

        if(config.x)
        {
            this.x=config.x;
        }

        if(config.y)
        {
            this.y=config.y;
        }

        this.scene.add.existing(this);

        if(config.event)
        {
            this.back.setInteractive();
            this.back.on('pointerdown', this.pressed, this);
        }

    }

    pressed()
    {
        if(this.config.params)
        {
            emitter.emit(this.config.event, this.config.params);   
        }
        else
        {
            emitter.emit(this.config.event);
        }
    }
}