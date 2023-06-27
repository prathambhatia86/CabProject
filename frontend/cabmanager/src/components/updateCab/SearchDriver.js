import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux'
import CabCard from '../updateDriver/CabCard';
import AssignCab from "../updateDriver/AssignCab";
import SelectedCab from "./SelectedCab";
import DriverDetail from "./DriverDetail";
const API_URL = 'https://localhost:5000';

export default function SearchDriver({ cab, onAssignment, goback }) {
    const user = useSelector(state => state.user.user);

    //React state for data of all drivers
    const [userData, changeUserData] = useState(null);
    //React state for current selected driver.
    const [currUserData, changeCurrUserData] = useState(null);

    const [formState, changeFormState] = useState(false);

    //React state for current driver selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);

    //Get the names of all drivers from the database using API call through axios.
    const getResponse = useCallback(async (event) => {
        try {
            let response = await axios.get(`${API_URL}/driverNonAssignedNames`, {
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

    let userDataSelectedFunction = (selectedValue) => {
        if (selectedValue.length == 0)
            return;
        if (!formState)
            changeFormState(true);
        changeCurrUserData(selectedValue[0]);
    }

    const assignCab = async () => {
        try {
            const values = {
                email: currUserData.email,
                registration_no: cab.registration_no
            }
            let response = await axios.post(`${API_URL}/assignDriver`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) onAssignment(currUserData);
            else toast("Failed to assign this driver");
        }
        catch {
            toast("Failed to assign this driver");
        }
    }

    //Return if not authorised
    if (!user || !user.isAuth) return;
    return (
        <>
            <div className="col-xl-11">
                {userData &&
                    <Typeahead
                        id="DriverIds"
                        onChange={userDataSelectedFunction}
                        options={userData}
                        placeholder="Update the driver"
                        selected={selectedUser}
                    />
                }
                <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                    <DriverDetail goback={goback} driver={currUserData} />
                    <div className="row g-0 justify-content-center my-2">
                        <div className="col-4 btn-group">
                            {currUserData && <button type="button" className="btn btn-primary" onClick={assignCab}>Assign This Driver</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}