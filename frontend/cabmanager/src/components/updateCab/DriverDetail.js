import React from 'react'

export default function DriverDetail({ driver }) {
    return (
        <>
            <h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Selected Driver</h1>
            <div className="card-body text-center">
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {driver ? driver.name : 'Please select a driver'}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {driver ? driver.email : 'Please select a driver'}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Contact</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {driver ? '(+91) ' + driver.contact : 'Please select a driver'}
                    </div>
                </div>
            </div>
        </>
    )
}
