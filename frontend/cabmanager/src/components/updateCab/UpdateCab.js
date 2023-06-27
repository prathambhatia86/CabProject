import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux'
import CabCard from '../updateDriver/CabCard';
import SelectedCab from "./SelectedCab";
import SearchDriver from "./SearchDriver";
import CabAssignedDriver from "./CabAssignedDriver";
import { RotatingLines } from 'react-loader-spinner'
const API_URL = 'https://localhost:5000';

export default function UpdateCabAssignments({ driver, goback, onAssignment }) {
    const user = useSelector(state => state.user.user);

    const [cabsLoading, changeCabsLoading] = useState(true);


    //React state for containing data of all cabs
    const [userData, changeUserData] = useState(null);
    //React state to hold current selected cab
    const [currUserData, changeCurrUserData] = useState(null);
    //Check if any driver is assigned or not.
    const [driverAssigned, changeDriverAssigned] = useState(false);

    const [formState, changeFormState] = useState(false);

    //React state for current cab selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);

    const getResponse = useCallback(async (event) => {
        try {
            let response = await axios.get(`${API_URL}/cabNames`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            let data = response.data;
            let newData = await data.map((val) => {
                val.label = val.registration_no;
                return val;
            })
            changeUserData(await newData);
            changeCabsLoading(false);
        }
        catch {
            toast("Failed to fetch cabs from our servers");
        }
    }, [user]);
    useEffect(() => {
        getResponse();
    }, [formState, getResponse]);
    //A function which responds with whether the user does have a cab already assigned or not.
    const checkAssignedDriver = useCallback(async () => {
        if (!currUserData) changeDriverAssigned(false);
        try {
            const values = { registration_no: currUserData.registration_no };
            let response = await axios.post(`${API_URL}/checkDriverAssigned`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) changeDriverAssigned(true);
            else {
                changeDriverAssigned(false);
            }
        }
        catch {
            toast("Failed to check if driver had any assigned cab due to server error.");
        }
    }, [user, currUserData]);

    //When a user is selected, recheck if any cab is assigned to him.
    useEffect(() => {
        if (currUserData) checkAssignedDriver();
    }, [checkAssignedDriver, currUserData]);

    //Return if not authorised
    if (!user || !user.isAuth) return;
    let userDataSelectedFunction = (selectedValue) => {
        if (selectedValue.length == 0)
            return;
        if (!formState)
            changeFormState(true);
        changeCurrUserData(selectedValue[0]);
    }
    return (
        <>
            {cabsLoading &&
                <div className="text-center">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }
            {!cabsLoading &&
                <>
                    <ToastContainer />
                    <section className="vh-100" style={{ display: 'block' }}>
                        <div className="row">
                            <div className="container">
                                <div className="row d-flex justify-content-center">
                                    {!currUserData &&
                                        <div className="col-xl-11">
                                            <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                                                <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                                                    {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                                                    Select a Cab
                                                </h2>
                                                <div className="card-body text-center">
                                                    {userData &&
                                                        <>
                                                            <Typeahead
                                                                id="DriverIds"
                                                                onChange={userDataSelectedFunction}
                                                                options={userData}
                                                                placeholder="Search For Cab"
                                                                selected={selectedUser}
                                                            />
                                                            <hr />
                                                        </>
                                                    }
                                                    {!userData && toast("Failed to fetch any cab")}
                                                    <div className="card mb-3" >
                                                        <div className="row g-0">
                                                            {userData && userData.map(elem => { return <CabCard cab={elem} key={elem.registration_no} clicked={() => changeCurrUserData(elem)} /> })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {currUserData && <SelectedCab cab={currUserData} goback={() => { changeCurrUserData(null); changeDriverAssigned(false); }} />}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container">
                                <div className="row d-flex justify-content-center  h-100">
                                    {/* Depending upon any cab is assigned or not we will either show that cab or show a search component */}
                                    {currUserData && (driverAssigned ? <CabAssignedDriver cab={currUserData} onDeassign={() => changeDriverAssigned(null)} /> : <SearchDriver cab={currUserData} onAssignment={() => changeDriverAssigned(true)} />)}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}
