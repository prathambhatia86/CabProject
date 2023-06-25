import React from 'react'
import { useSelector } from 'react-redux';
import CabDetail from "../cabCard/cabDetail";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */

export default function SelectedCab({ goback, cab }) {
    const user = useSelector(state => state.user.user);
    if (!user || !user.isAuth) return;
    return (
        <div className="col-xl-11">
            <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                    {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                    Selected Cab
                </h2>
                <CabDetail cab={cab} />
            </div>
        </div>
    )
}
