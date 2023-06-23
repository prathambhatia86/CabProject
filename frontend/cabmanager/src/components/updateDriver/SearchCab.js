import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux'
import CabCard from './CabCard';
import AssignCab from "./AssignCab";
const API_URL = 'https://localhost:5000';

export default function DriverAssignedCab({ driver, goback }) {
    const user = useSelector(state => state.user.user);
    //React state for data of current driver selected for updation
    const [userData, changeUserData] = useState(null);
    const [currUserData, changeCurrUserData] = useState(null);

    const [formState, changeFormState] = useState(false);

    //React state for current driver selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);
    //React state to determine whether a 
    const [cabSelected, changeCabSelected] = useState(false);
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
    if (!cabSelected) {
        return (
            <div className="col-xl-11">
                <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>

                    <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                        {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                        Assign a Cab
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
                        <div className="card mb-3" >
                            <div className="row g-0">
                                {[{ registration_no: 1 }, { registration_no: 2 }, { registration_no: 3 }].map(elem => { return <CabCard key={elem.registration_no} clicked={() => changeCabSelected(elem.registration_no)} /> })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <AssignCab driver={driver} cab={cabSelected} goback={() => changeCabSelected(null)} />
        )
    }
}
