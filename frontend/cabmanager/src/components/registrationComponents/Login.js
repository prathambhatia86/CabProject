import React from 'react'
import { Form, Link } from 'react-router-dom'

export default function Login(props) {
    console.log(props);
    return (
        <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
                <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }} >
                        <div className="card-body p-5 text-center" style={{ backgroundColor: 'rgb(249, 243, 195)', borderRadius: '1rem' }}>
                            <Form method='post' action={props.action}>
                                <h3 className="mb-5">Log in As {props.curr ? "a Driver" : "an Admin"}</h3>

                                <div className="form-outline mb-4">
                                    <input type="email formInput" id="typeEmailX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password formInput" id="typePasswordX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                <div className="form-check d-flex justify-content-start mb-4">
                                    <input className="form-check-input " type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label " htmlFor="form1Example3"> Remember password </label>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                            </Form>
                            <hr className="my-4" />
                            <Link to='/fgtpwd'><h6>Forgot Password?</h6></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
