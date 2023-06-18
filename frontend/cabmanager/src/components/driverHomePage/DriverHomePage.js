import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user';
import styles from "../../css/adminHomepage.module.css"
import { useNavigate } from 'react-router-dom';
import AssignedCab from './AssignedCab';
import Profile from './Profile';

export default function DriverHomePage() {

    //Using the useNavigate hook to redirect to another url
    const navigate = useNavigate();

    //dipatcher for login to store current user in the redux store.
    const dispatch = useDispatch();

    //React State for determining the currently navigation status
    const [navState, changeNavState] = useState(false);

    //React State for determining the current view 
    const [selectedState, changeSelectedState] = useState(1);

    //Change the Navigation state to close/open sidebar
    const toggleNav = () => {
        changeNavState((prev) => {
            return (!prev);
        });
    }

    //Reset the sidebar to default state
    const sidebarReset = () => {
        changeNavState(false);
    }

    //Get the current user from the redux store
    const user = useSelector(state => state.user.user);

    const logoutUser = () => {
        dispatch(logout());
        navigate('../');
    }

    //Responsiveness Shenanigans
    if (!user || !user.isAuth) {
        return;
    }

    let width = window.innerWidth;
    if (width >= 1250)
        width = 250
    return (
        <div style={{ height: '100%' }}>
            {/*The width is set to zero for collapsed sidebar */}
            <div id="mySidebar" className={`${styles.sidebar}  `} style={{ width: (navState === true ? width : '0px') }}>
                <i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
                <br />
                <div onClick={() => sidebarReset()}>
                    <span onClick={() => changeSelectedState(1)}>
                        Assigned Cabs
                    </span>
                </div>
                <br />
                <div className="container" onClick={() => sidebarReset()}>
                    <span onClick={() => changeSelectedState(2)}>
                        Profile
                    </span>
                </div>
                <br />
                <div className="position-relative bottom-0 text-danger" style={{ width: 'inherit' }} onClick={logoutUser}>Logout</div>
            </div>


            <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>


            <div className="container-fluid" style={{ paddingTop: "5rem", height: "100%" }}>
                <section className={`${(window.innerWidth > 1250) ? "mx-3" : " "}`} style={{ height: "100%" }}>
                    {selectedState === 1 ? <AssignedCab /> : ''}
                    {selectedState === 2 ? <Profile /> : ''}
                </section>
            </div >
        </div >
    )
}
