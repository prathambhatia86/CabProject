import React from 'react'

export default function CabCard() {
    return (
        <div className=' col-lg-4 col-md-4 col-sm-6 my-1 g-0' style={{ display: 'flex', backgroundColor: 'rgb(221, 221, 221)' }}>
            <div className="col-md-6">
                <img src="https://th.bing.com/th/id/OIP.1ZB6rZ5hTMhm6o3wJ9x5RQHaFU?w=267&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-6" >
                <div className="card-body" >
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    )
}
