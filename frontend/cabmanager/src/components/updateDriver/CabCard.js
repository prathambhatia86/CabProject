import React from 'react'

export default function CabCard({ cab, clicked }) {
    return (
        <div className=' col-lg-4 col-md-4 col-sm-6 my-1 g-0' style={{ display: 'flex', backgroundColor: 'rgb(221, 221, 221)' }} onClick={() => clicked(true)}>
            <div className="col-md-6">
                <img src={cab.image} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6 my-4" >
                <div className="card-body" >
                    <h5 className="card-title">{cab.registration_no}</h5>
                    <p className="card-text"><small className="text-muted">{cab.model}</small></p>
                </div>
            </div>
        </div>
    )
}
