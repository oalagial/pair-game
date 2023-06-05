import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Welcome from "./components/Welcome";
import PairGame from "./components/PairGame";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/pairGame" element={<PairGame />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
