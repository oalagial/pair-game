import { useNavigate } from "react-router-dom";
interface PlayerInfoProps {
  active_nickname: string;
  lifes: number;
}

function PlayerInfo({ active_nickname, lifes }: PlayerInfoProps) {
  const navigate = useNavigate();

  if (!active_nickname) {
    navigate("/");
  }

  return (
    <div className="player-stats">
      <span>Player: {active_nickname} </span>
      <span>Lifes: {lifes} </span>
    </div>
  );
}

export default PlayerInfo;
