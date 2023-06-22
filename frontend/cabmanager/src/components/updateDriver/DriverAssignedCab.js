import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux';
import SearchCab from "./SearchCab";
const API_URL = 'https://localhost:5000';


export default function DriverAssignedCab({ driver }) {
    const user = useSelector(state => state.user.user);
    const [wantSearch, changewantSearch] = useState(false);
    useEffect(() => {
        changewantSearch(false);
    }, [driver]);
    //Return if not authorised
    if (!user || !user.isAuth) return;
    if (!wantSearch) {
        return (
            <div className="col-xl-11">
                <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>

                    <h2 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Assigned Cab</h2>
                    <div className="row g-0">
                        <div className="col-md-3 mx-2 ">
                            <img src="https://th.bing.com/th/id/OIP.1ZB6rZ5hTMhm6o3wJ9x5RQHaFU?w=267&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7" className="img-fluid rounded-start px-4 py-1" alt="..." style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-8 px-5">
                            <div className="card-body">
                                <h5 className="card-title mt-2">Cab Number:</h5>
                                <p className="card-text mt-4">Cab Model:</p>
                                <p className="card-text ">Cab Color:</p>
                                {/*Modals are needed to give details regarding insurance/pollution certificate after being prompted. */}
                                <div className="btn-group mt-5 flex-wrap">
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
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Insurance details for /*Cab Number*/</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                        /*Data Here*/
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='modal' id="Pollution">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Pollution details for /*Cab Number*/</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                        /*Data Here*/
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="card-text"><small className="text-muted">Assigned to You on : /*Date here*/</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 justify-content-center my-2">
                        <div className="col-4 btn-group">
                            <button type="button" className="btn btn-primary">Change Assigned</button>
                            <button type="button" className="btn btn-danger" onClick={() => changewantSearch(true)}>Unassign This Cab</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <SearchCab driver={driver} />
        )
    }
}
