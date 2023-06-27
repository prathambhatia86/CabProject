import React, { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from 'react-redux';
import SearchDriver from "./SearchDriver";
import DriverDetail from "./DriverDetail";
import { RotatingLines } from 'react-loader-spinner'
const API_URL = 'https://localhost:5000';

export default function CabAssignedDriver({ cab, onDeassign }) {
    const user = useSelector(state => state.user.user);

    const [driverLoading, changeDriverLoading] = useState(true);

    //React state for whether the user wants to search for any other driver to assign to this driver.
    const [wantSearch, changewantSearch] = useState(false);
    //reset this when driver changes
    useEffect(() => {
        changewantSearch(false);
    }, [cab]);
    //Create a cab state for holding currently assigned driver
    const [driver, changeDriver] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const values = { registration_no: cab.registration_no };
                let response = await axios.post(`${API_URL}/getAssignedDriver`, JSON.stringify(values), {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": user ? user.token : null
                    },
                });
                changeDriver(response.data);
                changeDriverLoading(false);
            }
            catch {
                toast("Failed to fetch assigned Driver");
            }
        }
        fetchData();
    }, [cab, user]);
    const deassignCab = async () => {
        if (!driver) {
            toast("Still Fetching data please wait!");
            return;
        }
        try {
            const values = { email: driver.email, registration_no: cab.registration_no };
            let response = await axios.post(`${API_URL}/deassignCab`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) onDeassign();
            else toast("Deletion failed for some reason, please try later");
        }
        catch {
            toast("Deletion failed for some reason, please try later");
        }
    }
    //Return if not authorised
    if (!user || !user.isAuth) return;
    if (!wantSearch) {
        return (
            <div className="col-xl-11">
                <div className="card my-2 " style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                    {driverLoading &&
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
                    {!driverLoading &&
                        <>
                            < DriverDetail driver={driver} />
                            <div className="row g-0 justify-content-center my-2">
                                <div className="col-4 btn-group">
                                    <button type="button" className="btn btn-primary" onClick={() => changewantSearch(true)}>Change Assigned</button>
                                    <button type="button" className="btn btn-danger" onClick={deassignCab}>Unassign This Driver</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <SearchDriver cab={cab} goback={() => changewantSearch(false)} onAssignment={elem => { changewantSearch(false); changeDriver(elem); }} />
        )
    }
}
