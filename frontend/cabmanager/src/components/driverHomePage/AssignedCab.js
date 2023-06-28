import React from 'react'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = 'https://localhost:5000';

export default function AssignedCab() {
    const user = useSelector(state => state.user.user);
    const [cabAssigned, changeCabAssigned] = useState(false);

    //A function which responds with whether the user does have a cab already assigned or not.
    const checkAssignedCab = useCallback(async () => {
        if (!user) changeCabAssigned(false);
        try {
            const values = { email: user.email };
            let response = await axios.post(`${API_URL}/checkCabAssigned`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) changeCabAssigned(true);
            else {
                changeCabAssigned(false);
            }
        }
        catch {
            toast("Failed to check if driver had any assigned cab due to server error.");
        }
    }, [user]);
    useEffect(() => {
        if (user) checkAssignedCab();
    }, [checkAssignedCab, user]);

    //Create a cab state for holding currently assigned cab.
    const [cab, changeCab] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if (!cabAssigned) return;
            try {
                const values = { email: user.email };
                let response = await axios.post(`${API_URL}/getAssignedCab`, JSON.stringify(values), {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": user ? user.token : null
                    },
                });
                changeCab(response.data);
            }
            catch {
                toast("Failed to fetch assigned cab");
            }
        }
        fetchData();
    }, [user, cabAssigned]);

    if (!user || !user.isAuth) return;
    return (
        <div className="card mx-5 px-5 mb-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", height: "95%" }} >
            <div className='h3 text-black fw-bolder text-center py-5'>
                View your assigned Cab
            </div>
            <div className="card mb-5 " >
                {cabAssigned &&
                    (
                        cab ?
                            <div className="row g-0">
                                < div className="col-md-4 col-lg-3 col-sm-8 mx-2 ">
                                    <img src={cab.image} className="img-fluid rounded-start px-4 py-1" alt="..." style={{ width: '100%' }} />
                                </div>
                                <div className="col-md-8 px-5">
                                    <div className="card-body">
                                        <h5 className="card-title mt-2">Cab Number:{cab.registration_no}</h5>
                                        <p className="card-text mt-4">Cab Model:{cab.model}</p>
                                        <p className="card-text ">Cab Color:{cab.color}</p>
                                        <p className="card-text ">Odometer Reading:{cab.odometer} Kms</p>
                                        {/*Modals are needed to give details regarding insurance/pollution certificate after being prompted. */}
                                        <div className="btn-group mt-5 flex-wrap">
                                            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                                                View Insurance Details
                                            </button>
                                            <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Pollution">
                                                View Pollution Details
                                            </button>
                                        </div>
                                        <div className='modal' id="Insurance">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="staticBackdropLabel">Insurance details for {cab.registration_no}</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    {cab.insurance &&
                                                        <div className="modal-body">
                                                            <span className='font-monospace'>Policy Number : {cab.insurance.policy_number}</span><br />
                                                            <span className='font-monospace'>Company : {cab.insurance.company}</span><br />
                                                            <span className='font-monospace'>Expires : {cab.insurance.expires}</span><br />
                                                            <span className='font-monospace'>Next Payment on : {cab.insurance.next_payment}</span><br />
                                                            <span className='font-monospace'>Amount Payable : {cab.insurance.amount}</span><br />
                                                        </div>
                                                    }
                                                    {!cab.insurance &&
                                                        <div className="modal-body">
                                                            <h3 className='text-danger'>No Insurance Details Found</h3>
                                                        </div>
                                                    }
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
                                                        <h5 className="modal-title" id="staticBackdropLabel">Pollution details for {cab.registration_no}/</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    {cab.pollution &&
                                                        <div className="modal-body">
                                                            <span className='font-monospace'>ID : {cab.pollution.id}</span><br />
                                                            <span className='font-monospace'>Company : {cab.pollution.expires}</span><br />
                                                        </div>
                                                    }
                                                    {!cab.pollution &&
                                                        <div className="modal-body">
                                                            <h3 className='text-danger'>No Pollution Details Found</h3>
                                                        </div>
                                                    }
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : ' ' + {/*Loading component */ }
                    )
                }
                {!cabAssigned && <h1 className='text-center text-danger'>No Cab Assigned to you yet!</h1>}
            </div >
        </div >
    )
}
