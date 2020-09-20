class Grid
{
    constructor(config)
    {
        this.config = config;
        if (!config.scene)
        {
            console.log("missing scene");
            return;
        }

        if(!config.height)
        {
            config.height = game.config.height;
        }
        if(!config.width)
        {
            config.width = game.config.width;
        }
        if(!config.radius)
        {
            config.radius = game.config.width/2;
        }


        this.scene = config.scene;

    }

    show()
    {
        this.points = new Array();

        var n = 16;
        var w = 360 / n;
        var i =0;
        var theta = i * w;
        var r =  300;
        
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(1, 0xff0000);

        var center = [this.config.width/2, this.config.height/2];
        for (var index = i; index <= n; index++)
        { theta = index * w;
            this.graphics.moveTo(center[0], center[1]);

            var x =center[0] + (r * Math.sin(Math.PI * 2 * theta/360));
            var y = center[1] + (r * Math.cos(Math.PI * 2 * theta/360));

            this.points.push([x,y]);
            this.graphics.lineTo(x,y);
        }

        this.graphics.strokePath();

    }

    movePositions()
    {
        var positions = new Array;

        for (let i = 0; i < this.points.length - 1; i++) {
            
              var point = Util.midpoint(this.points[i],this.points[i + 1]);
              var x = point[0];
              var y = point[1];

              positions.push({X: x, Y:y})
           
          }

          return positions;

    }



}