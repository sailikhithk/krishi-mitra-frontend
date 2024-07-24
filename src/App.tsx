import reactLogo from "./assets/react.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import BiddingProcess from "./components/BiddingProcess";
import SoilHealthMonitoring from "./components/SoilHealthMonitoring";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/healthy-crops" element={<HealthyCrops />} /> */}
      <Route path="/soilhealth" element={<SoilHealthMonitoring />} />
      {/* <Route path="/pesticide-management" element={<PesticideManagement />} /> */}
      <Route path="/biddingprocess" element={<BiddingProcess />} />
      {/* <Route path="/vendor-interactions" element={<VendorInteractions />} /> */}
      {/* <Route path="/buyer-connections" element={<BuyerConnections />} /> */}
    </Routes>
  );
}

export default App;
