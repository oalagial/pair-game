import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

function PlayerInfo({ active_nickname, lifes }) {
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
