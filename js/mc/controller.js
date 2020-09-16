class Controller
{
    constructor()
    {
        
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
}