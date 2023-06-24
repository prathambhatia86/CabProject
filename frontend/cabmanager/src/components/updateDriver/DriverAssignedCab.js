import React, { useCallback, useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";
import { useSelector } from 'react-redux';
import SearchCab from "./SearchCab";
import CabDetail from "../cabCard/cabDetail";
const API_URL = 'https://localhost:5000';


export default function DriverAssignedCab({ driver }) {
    const user = useSelector(state => state.user.user);
    const [wantSearch, changewantSearch] = useState(false);
    useEffect(() => {
        changewantSearch(false);
    }, [driver]);
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
            }
            catch {
                toast("Failed to fetch assigned cab");
            }
        }
        fetchData();
    }, []);
    //Return if not authorised
    if (!user || !user.isAuth) return;
    if (!wantSearch) {
        return (
            <div className="col-xl-11">
                <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>

                    <h2 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Assigned Cab</h2>
                    {cab && <CabDetail assign={true} cab={cab} driver={driver} />}
                    <div className="row g-0 justify-content-center my-2">
                        <div className="col-4 btn-group">
                            <button type="button" className="btn btn-primary" onClick={() => changewantSearch(true)}>Change Assigned</button>
                            <button type="button" className="btn btn-danger" onClick={() => {/*[TODO] Make a function deassigning this cab */ }}>Unassign This Cab</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <SearchCab driver={driver} goback={() => changewantSearch(false)} onAssignment={elem => { changeCab(elem); changewantSearch(false); }} />
        )
    }
}
