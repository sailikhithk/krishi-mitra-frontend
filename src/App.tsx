import reactLogo from "./assets/react.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import BiddingProcess from "./components/BiddingProcess";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/biddingprocess" element={<BiddingProcess />} />
    </Routes>
  );
}

export default App;
