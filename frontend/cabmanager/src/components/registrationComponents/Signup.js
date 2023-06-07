import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div >
            <div className="container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center" style={{ backgroundColor: 'rgb(249, 243, 195)', borderRadius: '1rem' }}>

                                <h3 className="mb-5">Sign Up</h3>

                                <div className="form-outline mb-4">
                                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>

                                <hr className="my-4" />
                                <h6>Not a User?</h6>
                                <Link to='/'>Sign Up!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
