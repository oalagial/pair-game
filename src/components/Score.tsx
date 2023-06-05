import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

function Score({ score, level }) {
  return (
    <div className="player-stats">
      <span>Level: {level} </span>
      <span>Score: {score} </span>
    </div>
  );
}

export default Score;
