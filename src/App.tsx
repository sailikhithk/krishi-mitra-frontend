import "./App.css";
import HomePage from "./components/HomePage";
import BiddingProcess from "./components/BiddingProcess";
import SoilHealthMonitoring from "./components/SoilHealthMonitoring";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/healthy-crops" element={<HealthyCrops />} /> */}
        <Route path="/soilhealth" element={<SoilHealthMonitoring />} />
        {/* <Route path="/pesticide-management" element={<PesticideManagement />} /> */}
        <Route path="/biddingprocess" element={<BiddingProcess />} />
        {/* <Route path="/vendor-interactions" element={<VendorInteractions />} /> */}
        {/* <Route path="/buyer-connections" element={<BuyerConnections />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
