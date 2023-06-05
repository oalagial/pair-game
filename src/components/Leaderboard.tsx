import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { initializeActivePlayer } from "../features/pairGame/pairGameSlice";

type Player = {
  name: string;
  level: number;
  id: number;
};

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const active_nickname = useSelector(
    (state: RootState) => state.pairGame.nickname
  );

  const getOrdinalSuffix = (number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${number}th`;
    } else if (lastDigit <= 3) {
      return `${number}${suffixes[lastDigit]}`;
    } else {
      return `${number}th`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/leaderboard");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="title">Leaderboard</h2>
      <ul>
        {players
          .sort((player1, player2) => player2.level - player1.level)
          .map((player, index) => (
            <li
              key={index}
              className="li"
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                color: player.id === players.length ? "red" : "initial",
              }}
            >
              <span>{getOrdinalSuffix(index + 1)}</span>
              <span>{player.name}</span>
              <span className="level">{player.level}</span>
            </li>
          ))}
      </ul>
      <Box className="buttons-box">
        <Button
          variant="contained"
          onClick={() => {
            dispatch(initializeActivePlayer(active_nickname));
            navigate("/pairGame");
          }}
        >
          Start Again
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          New Player
        </Button>
      </Box>
    </div>
  );
};

export default Leaderboard;
