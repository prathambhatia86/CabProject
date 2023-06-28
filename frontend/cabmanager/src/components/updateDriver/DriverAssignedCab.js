import React, { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from 'react-redux';
import SearchCab from "./SearchCab";
import CabDetail from "../cabCard/cabDetail";
import { RotatingLines } from 'react-loader-spinner';
const API_URL = 'https://localhost:5000';


export default function DriverAssignedCab({ driver, onDeassign }) {
    const user = useSelector(state => state.user.user);

    const [cabLoading, changeCabLoading] = useState(true);

    //React state for whether the user wants to search for any other cab to assign to this driver.
    const [wantSearch, changewantSearch] = useState(false);
    //reset this when driver changes
    useEffect(() => {
        changewantSearch(false);
    }, [driver]);
    //Create a cab state for holding currently assigned cab.
    const [cab, changeCab] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const values = { email: driver.email };
                let response = await axios.post(`${API_URL}/getAssignedCab`, JSON.stringify(values), {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": user ? user.token : null
                    },
                });
                changeCab(response.data);
                changeCabLoading(false);
            }
            catch {
                toast("Failed to fetch assigned cab");
            }
        }
        fetchData();
    }, [driver, user]);
    const deassignCab = async () => {
        if (!cab) {
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
            <>
                {cabLoading &&
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
                {!cabLoading &&
                    <div className="col-xl-11">
                        <div className="card my-2 " style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                            <h2 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Assigned Cab</h2>
                            {cab && <CabDetail cab={cab} driver={driver} />}
                            <div className="row g-0 justify-content-center my-2">
                                <div className="col-4 btn-group">
                                    <button type="button" className="btn btn-primary" onClick={() => changewantSearch(true)}>Change Assigned</button>
                                    <button type="button" className="btn btn-danger" onClick={deassignCab}>Unassign This Cab</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <SearchCab driver={driver} goback={() => changewantSearch(false)} onAssignment={elem => { changeCab(elem); changewantSearch(false); }} />
        )
    }
}
