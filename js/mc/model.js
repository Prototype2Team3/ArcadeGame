class Model
{
    constructor()
    {
        this._score=0;
        this._totalTimeMs = 2500;
        this._timeElapsed = 0;
        this._difficultyIndex = 1;

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
    set timeElapsed(val)
    {
        this._timeElapsed=val;
        console.log("time updated")
        emitter.emit(G.TIME_UPDATED);
    }
    get timeElapsed()
    {
        return this._timeElapsed;
    }
}