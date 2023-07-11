import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux'
import CabCard from './CabCard';
import AssignCab from "./AssignCab";
import { RotatingLines } from 'react-loader-spinner';
import { FixedSizeList } from "react-window";
const API_URL = '';

export default function SearchCab({ driver, goback, onAssignment }) {
    const user = useSelector(state => state.user.user);

    const [cabsLoading, changeCabsLoading] = useState(true);

    //React state for containing data of all cabs
    const [userData, changeUserData] = useState(null);
    //React state to hold current selected cab
    const [currUserData, changeCurrUserData] = useState(null);

    const [formState, changeFormState] = useState(false);

    //React state for current cab selected for updation
    const [selectedUser, changeSelectedUser] = useState(null);

    const getResponse = useCallback(async (event) => {
        try {
            let response = await axios.get(`${API_URL}/cabNonAssignedNames`, {
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

    //Return if not authorised
    if (!user || !user.isAuth) return;
    let userDataSelectedFunction = (selectedValue) => {
        if (selectedValue.length == 0)
            return;
        if (!formState)
            changeFormState(true);
        changeCurrUserData(selectedValue[0]);
    }
    if (!currUserData) {
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
                                        {userData &&
                                            <div className="row">
                                                <div className="text-center col-md-2 col-lg-3">
                                                </div>
                                                <div className="text-center col-md-8 col-lg-6">
                                                    <FixedSizeList
                                                        className="List d-flex"
                                                        height={500}
                                                        itemCount={userData.length}
                                                        itemSize={50}
                                                        itemData={userData}
                                                        width='100%'
                                                    >

                                                        {(props) => CabCard({ ...props, clicked: (elem) => changeCurrUserData(elem) })}

                                                    </FixedSizeList>
                                                </div>
                                                <div className="text-center col-md-2 col-lg-3">
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    } else {
        return (
            <AssignCab driver={driver} registration_no={currUserData} onAssignment={onAssignment} goback={() => changeCurrUserData(null)} />
        )
    }
}
