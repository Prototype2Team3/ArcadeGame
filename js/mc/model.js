class Model
{
    constructor()
    {
        this._score=0;
        this._bullets;
        this._lives = 3;
    }
    set score(val)
    {
        this._score=val;
        console.log("score updated");
        emitter.emit(G.SCORE_UPDATED);
    }
    get score()
    {
        return this._score;
    }
    set lives(val)
    {
        this._lives=val;
    }
    get lives()
    {
        return this._lives;
    }
}