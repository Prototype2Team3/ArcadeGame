class Align{
    static scaletoGame(obj , percentage) {
        obj.displayWidth = game.config.with * percentage;
        obj.scaleY = obj.scaleX;
    }

    static center(obj){
        obj.x = game.config.width / 2;
        obj.y = game.config.height / 2;
    }

    static centerH(obj)
    {
        obj.x = game.config.width / 2;
    }

    static centerV(obj)
    {
        obj.y = game.config.height / 2;
    }
}