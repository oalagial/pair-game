function Score({ score, level }) {
  return (
    <div className="player-stats">
      <span>Level: {level} </span>
      <span>Score: {score} </span>
    </div>
  );
}

export default Score;
