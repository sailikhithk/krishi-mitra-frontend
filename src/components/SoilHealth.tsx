import { PieChart } from "recharts";
import appLogo from "../assets/Logo.jpg";
import PieCharts from "./PieCharts";
import "./SoilHealth.css";
import BarCharts from "./BarCharts";
import AreaCharts from "./AreaChart";
import LineCharts from "./LineChart";

function SoilHealth() {
  const soiltestingresults = [
    {
      image: "path_to_image1.jpg",
      title: "Capsicum",
    },
    {
      image: "path_to_image1.jpg",
      title: "Chilli",
    },
    {
      image: "path_to_image1.jpg",
      title: "Bell pepper",
    },
    {
      image: "path_to_image1.jpg",
      title: "Spinach",
    },
    {
      image: "path_to_image1.jpg",
      title: "Tomato",
    },
    {
      image: "path_to_image1.jpg",
      title: "Potato",
    },
    {
      image: "path_to_image1.jpg",
      title: "Radish",
    },
  ];

  return (
    <>
      <div className="soilhealthpage">
        <div className="header">
          <img src={appLogo} alt="KRISHI MITRA App Logo" />
          <h1>Soil Health Monitoring</h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="overallscore">
              <PieCharts></PieCharts>
              <h4>Overall Score</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="projectedscore">
              <PieCharts></PieCharts>
              <h4>Projected Score</h4>
            </div>
          </div>
        </div>

        <div className="soiltest-results">
          <h2>Soil Testing Results</h2>
          <div className="hub-grid">
            {soiltestingresults.map((item, index) => (
              <div key={index} className="hub-item">
                <img src={item.image} alt={item.title} />
                <h5>{item.title}</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-sm-3">
            <div className="overallscore">
              <BarCharts></BarCharts>
              <h4>Soil Testing results</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-3">
            <div className="projectedscore">
              <BarCharts></BarCharts>
              <h4>Fertilizers Results</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-3">
            <div className="overallscore">
              <AreaCharts></AreaCharts>
              <h4>Crop Yield</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-3">
            <div className="projectedscore">
              <LineCharts></LineCharts>
              <h4>Temperature</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoilHealth;
