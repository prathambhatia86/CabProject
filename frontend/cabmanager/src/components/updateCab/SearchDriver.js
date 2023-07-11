import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux'
import { RotatingLines } from 'react-loader-spinner'
import DriverDetail from "./DriverDetail";
const API_URL = '';

export default function SearchDriver({ cab, onAssignment, goback }) {
    const user = useSelector(state => state.user.user);

    const [loading, changeLoading] = useState(true);

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
            changeLoading(false);
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
                registration_no: cab
            }
            let response = await axios.post(`${API_URL}/assignDriver`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) {
                onAssignment(currUserData);
                changeFormState(false);
            }
            else toast("Failed to assign this driver");
        }
        catch {
            toast("Failed to assign this driver");
        }
    }

    //Return if not authorised
    if (!user || !user.isAuth || !cab) return;
    return (
        <>
            <div className="col-xl-11">
                {loading &&
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
                {!loading &&
                    <>
                        <Typeahead
                            id="DriverIds"
                            onChange={userDataSelectedFunction}
                            options={userData}
                            placeholder="Update the driver"
                            selected={selectedUser}
                        />
                        <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                            <DriverDetail goback={goback} driver={currUserData} />
                            <div className="row g-0 justify-content-center my-2">
                                <div className="col-4 btn-group">
                                    {currUserData && <button type="button" className="btn btn-primary" onClick={assignCab}>Assign This Driver</button>}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
