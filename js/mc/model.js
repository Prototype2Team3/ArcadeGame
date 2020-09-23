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
        emitter.emit(G.SCORE_UPDATED);
    }
    get score()
    {
        return this._score;
    }
    set timeElapsed(val)
    {
        this._timeElapsed=val;
        emitter.emit(G.TIME_UPDATED);
    }
    get timeElapsed()
    {
        return this._timeElapsed;
    }
}