import { TextField, Button, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

function Header() {
  return (
    <div>
      <h2>* Summery Evocation *</h2>
    </div>
  );
}

export default Header;
