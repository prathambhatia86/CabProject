import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import CabDetail from "../cabCard/cabDetail";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

const API_URL = '';
/* eslint-disable eqeqeq */

export default function SelectedCab({ goback, registration_no }) {
    const user = useSelector(state => state.user.user);
    const [cab, changeCab] = useState(null);
    useEffect(() => {
        if (cab) return;
        const fetchData = async () => {
            try {
                const values = { registration_no: registration_no };
                let response = await axios.post(`${API_URL}/getCab`, JSON.stringify(values), {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": user ? user.token : null
                    },
                });
                changeCab(response.data);
            }
            catch {
                toast("Failed to fetch assigned Cab");
            }
        }
        fetchData();
    }, [cab, user, registration_no]);
    if (!user || !user.isAuth) return;
    return (
        <>
            {!cab &&
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
            {
                cab &&
                <div className="col-xl-11">
                    <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                        <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                            {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                            Selected Cab
                        </h2>
                        <CabDetail cab={cab} />
                    </div>
                </div>
            }
        </>
    )
}
