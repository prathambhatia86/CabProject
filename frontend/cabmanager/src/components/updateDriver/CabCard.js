import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import axios from "axios";

const API_URL = 'https://localhost:5000';

export default function CabCard({ data, index, clicked }) {
    const user = useSelector(state => state.user.user);
    const reg = data[index].registration_no;
    const [cab, changeCab] = useState(null);
    useEffect(() => {
        if (cab) return;
        const fetchData = async () => {
            try {
                const values = { registration_no: reg };
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
    }, [cab, user, reg]);
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
            {cab &&
                <div className='my-1 g-0' style={{ display: 'flex' }} onClick={() => clicked(reg)}>
                    <div className="col-6">
                        <img src={cab.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-6 my-4" >
                        <div className="card-body" >
                            <h5 className="card-title">{cab.registration_no}</h5>
                            <p className="card-text"><small className="text-muted">{cab.model}</small></p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
