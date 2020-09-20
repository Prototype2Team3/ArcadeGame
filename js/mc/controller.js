class Controller
{
    constructor()
    {
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints);
        emitter.on(G.DOWN_POINTS, this.downPoints);
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
}