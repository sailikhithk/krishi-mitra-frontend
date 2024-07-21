import "./GovernmentSchemes.css";
import { RiPlantFill } from "react-icons/ri";
import { FaWater } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbArrowsLeftRight } from "react-icons/tb";
function GovernmentSchemes() {
  return (
    <>
      <div className="govtcard">
        <br></br>
        <h5 className="card-heading">Government Schemes</h5>
        <div className="schemecards">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <RiPlantFill />{" "}
                  </h1>
                  <h5 className="card-title">Healthy Crops</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <FaWater />{" "}
                  </h1>
                  <h5 className="card-title">Water optimization</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <FaLeaf />{" "}
                  </h1>
                  <h5 className="card-title">Pesticide management</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <FaHandshakeSimple />{" "}
                  </h1>
                  <h5 className="card-title">Efficient bidding process</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <FaPeopleGroup />{" "}
                  </h1>
                  <h5 className="card-title">Vendor interactions</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body-new">
                  <button className="detailsbutton" type="button">
                    Details
                  </button>
                  <h1 className="iconsgovt">
                    {" "}
                    <TbArrowsLeftRight />{" "}
                  </h1>
                  <h5 className="card-title">Buyer Connections</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GovernmentSchemes;
