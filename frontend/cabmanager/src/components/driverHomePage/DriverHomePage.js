import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../store/user';
import styles from "../../css/adminHomepage.module.css"

export default function DriverHomePage() {
    const [navState, changeNavState] = useState(false);
    const [selectedState, changeSelectedState] = useState('1');
    const toggleNav = () => {
        changeNavState((prev) => {
            return (!prev);
        });
    }
    const sidebarReset = () => {
        changeNavState(false);
    }
    const user = useSelector(state => state.user.user);
    if (!user || !user.isAuth) return ('');
    let width = window.innerWidth;
    if (width >= 1250)
        width = 250
    return (
        <div style={{ height: '100%' }}>
            <div id="mySidebar" className={`${styles.sidebar}  `} style={{ width: (navState === true ? width : '0px') }}>
                <i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
                <br />
                <div onClick={() => sidebarReset()}>
                    <span>
                        Assigned Cabs
                    </span>
                </div>
                <br />
                <div className="container" onClick={() => sidebarReset()}>
                    <span >
                        Profile
                    </span>
                </div>
                <br />
            </div>


            <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>
            <div className="container-fluid" style={{ paddingTop: "4rem" }}>
            </div>


            <div className="container-fluid" style={{ paddingTop: "2rem", height: "100%" }}>
                <section className={`${(window.innerWidth > 1250) ? "mx-3" : " "}`} style={{ height: "100%" }}>
                    <div className="card mx-5 px-5 mb-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", height: "95%" }} >
                        <div className='h3 text-black fw-bolder text-center py-5'>
                            View your assigned Cab
                        </div>
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-5 mx-2 ">
                                    <img src="https://th.bing.com/th/id/OIP.1ZB6rZ5hTMhm6o3wJ9x5RQHaFU?w=267&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7" className="img-fluid rounded-start" alt="..." style={{ width: '100%' }} />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">CaB Number</h5>
                                        <p className="card-text">Cab Model</p>
                                        <p className="card-text">Cab Color</p>
                                        <p className="card-text"><small className="text-muted">Last s mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}
