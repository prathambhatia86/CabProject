import { useCallback, useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from 'react-redux'
import DriverAssignedCab from "./DriverAssignedCab";
import SearchCab from "./SearchCab";

const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */

export default function UpdateDriverAssignments(props) {
    const user = useSelector(state => state.user.user);

    //React state for data of all drivers
    const [userData, changeUserData] = useState(null);
    //React state for current selected driver.
    const [currUserData, changeCurrUserData] = useState(null);
    //Check if any cab is assigned or not.
    const [cabAssigned, changeCabAssigned] = useState(false);

    const [formState, changeFormState] = useState(false);

    //React state for current driver selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);

    //Get the names of all drivers from the database using API call through axios.
    const getResponse = useCallback(async (event) => {
        try {
            let response = await axios.get(`${API_URL}/driverNames`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            let data = response.data;
            //Converting object to string for selection
            let newData = await data.map((val) => {
                val.label = val.name + '~' + val.email;
                return val;
            })
            changeUserData(await newData);
        }
        catch {
            toast("Failed to fetch drivers from our servers");
        }
    }, [user]);

    useEffect(() => {
        getResponse();
    }, [formState, getResponse]);

    //A function which responds with whether the user does have a cab already assigned or not.
    const checkAssignedCab = useCallback(async () => {
        if (!currUserData) changeCabAssigned(false);
        try {
            const values = { email: currUserData.email };
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
    }, [user, currUserData]);

    //When a user is selected, recheck if any cab is assigned to him.
    useEffect(() => {
        if (currUserData) checkAssignedCab();
    }, [checkAssignedCab, currUserData]);

    let userDataSelectedFunction = (selectedValue) => {
        if (selectedValue.length == 0)
            return;
        if (!formState)
            changeFormState(true);
        changeCurrUserData(selectedValue[0]);
    }

    //Return if not authorised
    if (!user || !user.isAuth) return;
    return (
        <>
            <ToastContainer />
            {userData && (
                <>
                    <section className="vh-100" style={{ display: 'block' }}>
                        <div className="row">
                            <div className="container">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-xl-11">
                                        <Typeahead
                                            id="DriverIds"
                                            onChange={userDataSelectedFunction}
                                            options={userData}
                                            placeholder="Update the driver"
                                            selected={selectedUser}
                                        />
                                        <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                                            <h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Selected Driver</h1>
                                            <div className="card-body text-center">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {formState ? currUserData.name : 'Please select a driver'}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {formState ? currUserData.email : 'Please select a driver'}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Contact</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {formState ? '(+91) ' + currUserData.contact : 'Please select a driver'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container">
                                <div className="row d-flex justify-content-center  h-100">
                                    {/* Depending upon any cab is assigned or not we will either show that cab or show a search component */}
                                    {currUserData && (cabAssigned ? <DriverAssignedCab driver={currUserData} /> : <SearchCab driver={currUserData} onAssignment={(elem) => changeCabAssigned(true)} />)}
                                </div>
                            </div>
                        </div>
                    </section>
                </>)
            }
        </>
    )
}