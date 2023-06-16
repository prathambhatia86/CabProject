import { useState } from "react";
import styles from "../css/adminHomepage.module.css"
import Cab from "./cab/Cab";
import Driver from "./driver/Driver";
import UpdateDriver from "./driver/UpdateDriver";
import CabAssignments from "./updateCab/UpdateCab";
import DriverAssignments from "./updateDriver/UpdateDriver";
export default function AdminHomepage(props) {
  const [navState, changeNavState] = useState(false);
  const [selectedState, changeSelectedState] = useState('1')
  const toggleNav = () => {
    changeNavState((prev) => {
      return (!prev);
    });
  }

  const sidebarReset = () => {
    changeNavState(false);
    if (document.getElementById('driverSidebar').classList.contains("show")) document.getElementById('driverSidebar').classList.toggle("show");
    if (document.getElementById('cabSidebar').classList.contains("show")) document.getElementById('cabSidebar').classList.toggle("show")
  }
  const driverDetails = () => {
    changeSelectedState('1');

  }
  const cabDetails = () => {
    changeSelectedState('2');

  }
  const driverChange = () => {
    changeSelectedState('3');
    changeNavState(false);
  }
  const cabChange = () => {
    changeSelectedState('4');
    changeNavState(false);
  }
  const driverAdd = () => {
    changeSelectedState('1');
    changeNavState(false);
  }
  const driverUpdate = () => {
    changeSelectedState('5');
    changeNavState(false);
  }
  const driverDelete = () => {
    changeSelectedState('6');
    changeNavState(false);
  }
  let width = window.innerWidth;
  if (width >= 1250)
    width = 250
  return (
    <div>
      <div id="mySidebar" className={`${styles.sidebar}  `} style={{ width: (navState === true ? width : '0px') }}>
        <i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
        <br />
        <div>
          <span onClick={driverDetails} data-bs-toggle="collapse" data-bs-target="#driverSidebar">
            Driver ↧
          </span>
          <div className="container-fluid collapse row " id="driverSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
            <div className={`col ${styles.subMenuOptions}`} onClick={driverAdd}>
              enter new driver!
            </div>
            <div className={`col ${styles.subMenuOptions}`} onClick={driverUpdate}>
              Update driver details!
            </div>
            <div className={`col ${styles.subMenuOptions}`} onClick={driverDelete}>
              remove a driver!
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <span onClick={cabDetails} data-bs-toggle="collapse" data-bs-target="#cabSidebar">
            Cab ↧
          </span>
          <div className="container-fluid collapse row" id="cabSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
            <div className={`col ${styles.subMenuOptions}`} onClick={() => sidebarReset()}>
              Click me!
            </div>
            <div className={`col ${styles.subMenuOptions}`} onClick={() => sidebarReset()}>
              Click me!
            </div>
            <div className={`col ${styles.subMenuOptions}`} onClick={() => sidebarReset()}>
              Click me!
            </div>
          </div>
        </div>
        <br />
        <div onClick={driverChange}>Driver Assignments</div>
        <br />
        <div onClick={cabChange} >Cab Assignments</div>
        <div className="position-relative bottom-0 text-danger" style={{ width: 'inherit' }}>Logout</div>
      </div>


      <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>
      <div className="container-fluid" style={{ paddingTop: "4rem" }}>
        <Cab select={selectedState} />
        <Driver select={selectedState} />
        <CabAssignments select={selectedState} />
        <DriverAssignments select={selectedState} />
        <UpdateDriver select={selectedState} />
      </div>
    </div >
  )
}
