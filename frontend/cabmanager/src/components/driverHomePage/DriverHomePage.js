import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user';
import styles from "../../css/adminHomepage.module.css"
import { useNavigate } from 'react-router-dom';

export default function DriverHomePage() {

    //Using the useNavigate hook to redirect to another url
    const navigate = useNavigate();

    //dipatcher for login to store current user in the redux store.
    const dispatch = useDispatch();

    //React State for determining the currently navigation status
    const [navState, changeNavState] = useState(false);

    //React State for determining the current view 
    const [selectedState, changeSelectedState] = useState('1');

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
    if (!user || !user.isAuth) return ('');
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
                <div className="position-relative bottom-0 text-danger" style={{ width: 'inherit' }} onClick={logoutUser}>Logout</div>
            </div>


            <button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>


            <div className="container-fluid" style={{ paddingTop: "5rem", height: "100%" }}>
                <section className={`${(window.innerWidth > 1250) ? "mx-3" : " "}`} style={{ height: "100%" }}>
                    <div className="card mx-5 px-5 mb-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", height: "95%" }} >
                        <div className='h3 text-black fw-bolder text-center py-5'>
                            View your assigned Cab
                        </div>
                        <div className="card mb-5 " >
                            <div className="row g-0">
                                <div className="col-md-5 mx-2 ">
                                    <img src="https://th.bing.com/th/id/OIP.1ZB6rZ5hTMhm6o3wJ9x5RQHaFU?w=267&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7" className="img-fluid rounded-start px-2 py-1" alt="..." style={{ width: '100%' }} />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title mt-2">Cab Number:</h5>
                                        <p className="card-text mt-4">Cab Model:</p>
                                        <p className="card-text ">Cab Color:</p>
                                        {/*Modals are needed to give details regarding insurance/pollution certificate after being prompted. */}
                                        <div class="btn-group mt-5 flex-wrap">
                                            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                                                View Insurance Details
                                            </button>
                                            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Pollution">
                                                View Pollution Details
                                            </button>
                                            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                                                View /*Something*/ Details
                                            </button>
                                        </div>
                                        <div className='modal' id="Insurance">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">Insurance details for /*Cab Number*/</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        /*Data Here*/
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='modal' id="Pollution">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">Pollution details for /*Cab Number*/</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        /*Data Here*/
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="card-text"><small className="text-muted">Assigned to You on : /*Date here*/</small></p>
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
