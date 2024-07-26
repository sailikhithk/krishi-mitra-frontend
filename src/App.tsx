import reactLogo from "./assets/react.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import BiddingProcess from "./components/BiddingProcess";
import Profile from "./components/Profile";
import { Route, Routes } from "react-router";
import SoilHealth from "./components/SoilHealth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/biddingprocess" element={<BiddingProcess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/soilhealth" element={<SoilHealth />} />
    </Routes>
  );
}

export default App;
