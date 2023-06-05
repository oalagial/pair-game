interface ScoreProps {
  score: number;
  level: number;
}

function Score({ score, level }: ScoreProps) {
  return (
    <div className="player-stats">
      <span>Level: {level} </span>
      <span>Score: {score} </span>
    </div>
  );
}

export default Score;
