import React from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Login(props) {
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        axios.get(props.action, {
        }).then(({ data }) => {
            /*if (!data.isAuth) {
                alert(data.error);
            }*/
            console.log(data);
            navigate('/homepage');
        });
    };
    return (
        <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
                <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }} >
                        <div className="card-body p-5 text-center" style={{ backgroundColor: 'rgb(249, 243, 195)', borderRadius: '1rem' }}>
                            <Form method='post' onSubmit={handleSubmit}>
                                <h3 className="mb-5">Log in As {props.curr ? "a Driver" : "an Admin"}</h3>

                                <div className="form-outline mb-4">
                                    <input type="email formInput" id="typeEmailX-2" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
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
