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

    //React state for data of current driver selected for updation
    const [userData, changeUserData] = useState(null);
    const [currUserData, changeCurrUserData] = useState(null);

    const [formState, changeFormState] = useState(false);

    //React state for current driver selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);

    const getResponse = useCallback(async (event) => {
        try {
            let response = await axios.get(`${API_URL}/driverNames`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            let data = response.data;
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

    //Return if not authorised
    if (!user || !user.isAuth) return;
    let userDataSelectedFunction = (selectedValue) => {
        if (selectedValue.length == 0)
            return;
        if (!formState)
            changeFormState(true);
        changeCurrUserData(selectedValue[0]);
    }
    //[TODO]Add a function which responds with whether the user does have a cab already assigned or not.
    const checkAssignedCab = () => {
        //Temporary logic for frontend development.
        return true;
    }
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
                                    {currUserData && (checkAssignedCab() ? <DriverAssignedCab driver={currUserData} /> : <SearchCab driver={currUserData} />)}
                                </div>
                            </div>
                        </div>
                    </section>
                </>)
            }
        </>
    )
}