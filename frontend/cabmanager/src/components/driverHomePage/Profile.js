import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const user = useSelector(state => state.user.user);

    return (
        <div className="card mx-5 px-5 mb-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", height: "95%" }} >
            <div className='h3 text-black fw-bolder text-center py-5'>
                Your Profile
            </div>
            <div className="col-lg-12">
                <div className="card mb-5 " >
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Name</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{user.name}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Email</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">{user.email}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Phone Number</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">(+91) {user.contact}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Mobile</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">(098) 765-4321</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-0">Address</p>
                            </div>
                            <div className="col-sm-9">
                                <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
