import React from 'react'
import { useSelector } from 'react-redux';
import CabDetail from "../cabCard/cabDetail";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */

export default function AssignCab({ goback, driver, cab, onAssignment }) {
    const user = useSelector(state => state.user.user);
    const assignCab = async () => {
        try {
            const values = { email: driver.email, registration_no: cab.registration_no };
            let response = await axios.post(`${API_URL}/assignCab`, JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": user ? user.token : null
                },
            });
            if (response.data) onAssignment(cab);
        }
        catch {
            toast("Failed to assign the cab to this driver");
        }
    }
    if (!user || !user.isAuth) return;
    return (
        <div className="col-xl-11">
            <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                    {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                    Assign a Cab
                </h2>
                <CabDetail cab={cab} driver={driver} assigned={false} />
                <div className="row g-0 justify-content-center my-2">
                    <div className="col-4 btn-group">
                        <button type="button" className="btn btn-primary" onClick={assignCab}>Assign This Cab</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
