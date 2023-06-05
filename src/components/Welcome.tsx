import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { initializeActivePlayer } from "../features/pairGame/pairGameSlice";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Box>
        <Box style={{ margin: 20 }}>
          <TextField
            id="outlined-basic"
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNickname(event.target.value);
            }}
          />
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(initializeActivePlayer(nickname));
            navigate("/pairGame");
          }}
        >
          Start
        </Button>
      </Box>
    </div>
  );
}

export default Welcome;
