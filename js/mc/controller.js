class Controller
{
    constructor()
    {
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints);
        emitter.on(G.DOWN_POINTS, this.downPoints);
        emitter.on(G.UP_TIME, this.upTime);
    }
    setScore(score)
    {
        model.score=score;
    }
    upPoints(points)
    {
        var score = model.score;
        score+=points;
        model.score = score;
    }

    downPoints(points)
    {
        var score = model.score;
        score-=points;
        model.score = score;

    }

    upTime(time)
    {
        var timeE = model.timeElapsed;
        timeE++;
        model.timeElapsed = timeE;
    }
}