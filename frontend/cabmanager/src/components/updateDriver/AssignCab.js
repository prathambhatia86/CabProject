import React from 'react'
import { useSelector } from 'react-redux';
import CabDetail from "../cabCard/cabDetail";
export default function AssignCab({ goback, driver, cab }) {
    const user = useSelector(state => state.user.user);
    if (!user || !user.isAuth) return;
    return (
        <div className="col-xl-11">
            <div className="card my-2" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
                <h2 className="text-yellow mb-4 py-4 text-center me-5" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>
                    {goback && <button className='btn btn-danger' onClick={goback}>&lt;</button>}
                    Assign a Cab
                </h2>
                <CabDetail />
                <div className="row g-0 justify-content-center my-2">
                    <div className="col-4 btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => {/*[TODO] Make a function assigning this cab */ }}>Assign This Cab</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
