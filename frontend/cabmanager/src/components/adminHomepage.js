import { useState } from "react";
import styles from "../css/adminHomepage.module.css"
import Cab from "./cab/Cab";
import Driver from "./driver/Driver";
import UpdateCab from "./updateCab/UpdateCab";
import UpdateDriver from "./updateDriver/UpdateDriver";
export default function AdminHomepage(props) {
  const [navState, changeNavState] = useState(false);
  const [selectedState, changeSelectedState] = useState('1')
  const toggleNav = () => {
    changeNavState((prev) => {

      return (!prev);
    });
  }
  const driverDetails = () => {
    changeSelectedState('1');
    document.getElementById('driverSidebar').classList.toggle("show");
    //Commented out for Now
    //changeNavState(false);
  }
  const cabDetails = () => {
    changeSelectedState('2');
    document.getElementById('cabSidebar').classList.toggle("show");
    //Commented out for Now
    //changeNavState(false);
  }
  const driverChange = () => {
    changeSelectedState('3');
    changeNavState(false);
  }
  const cabChange = () => {
    changeSelectedState('4');
    changeNavState(false);
  }
  let width = window.innerWidth;
  if (width >= 1250)
    width = 250
  return (
    <div>
      <div id="mySidebar" className={`${styles.sidebar}`} style={{ width: (navState === true ? width : '0px') }}>
        <i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
        <br />
        <div>
          <div onClick={driverDetails} >
            Driver
          </div>
          <div className="container-fluid collapse row" id="driverSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
            <div className="col">
              Click me!
            </div>
            <div className="col">
              Click me!
            </div>
            <div className="col">
              Click me!
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div onClick={cabDetails}>
            Cab
          </div>
          <div className="container-fluid collapse row" id="cabSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
            <div className="col">
              Click me!
            </div>
            <div className="col">
              Click me!
            </div>
            <div className="col">
              Click me!
            </div>
          </div>
        </div>
        <br />
        <div onClick={driverChange}>Driver Assignments</div>
        <br />
        <div onClick={cabChange} >Cab Assignments</div>
      </div>


      <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>
      <div className="container-fluid" style={{ paddingTop: "4rem" }}>
        <Cab select={selectedState} />
        <Driver select={selectedState} />
        <UpdateCab select={selectedState} />
        <UpdateDriver select={selectedState} />
      </div>
    </div >
  )
}
