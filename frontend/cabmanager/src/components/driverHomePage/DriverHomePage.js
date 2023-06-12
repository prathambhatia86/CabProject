import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/user';
import styles from "../../css/adminHomepage.module.css"

export default function DriverHomePage() {
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
    const user = useSelector(state => state.user.user); console.log(user);
    if (!user || !user.isAuth) return ('');
    let width = window.innerWidth;
    if (width >= 1250)
        width = 250
    return (
        <div>
            <div id="mySidebar" className={`${styles.sidebar}  `} style={{ width: (navState === true ? width : '0px') }}>
                <i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
                <br />
                <div>
                    <span onClick={''} data-bs-toggle="collapse" data-bs-target="#driverSidebar">
                        Driver ↧
                    </span>
                    <div className="container-fluid collapse row " id="driverSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
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
                <div className="container">
                    <span onClick={''} data-bs-toggle="collapse" data-bs-target="#cabSidebar">
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
                <div onClick={''}>Driver Assignments</div>
                <br />
                <div onClick={''} >Cab Assignments</div>
            </div>


            <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>
            <div className="container-fluid" style={{ paddingTop: "4rem" }}>
            </div>
        </div >
    )
}
