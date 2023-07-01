import React, { useState, useEffect } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import styles from "../../css/driverPageAdmin.module.css"
const API_URL = 'https://localhost:5000';

export default function Forgot(props) {
    let navigate = useNavigate();
    //Authenticate and log-in the user, alert in case of error.
    const handleSubmit = event => {
        event.preventDefault();
        axios.post(API_URL + '/forgotPassword', { email: email }).then((data) => {
            if (data) {
                navigate('../');
            } else toast("Sorry this isn't working due to some reason");
        }).catch((err) => {
            toast("Sorry this isn't working due to some reason");
        });

    };

    //React state to hold formdata
    const [email, setEmail] = useState('');
    const [invalidEmail, trackInvalidEmail] = useState(true);
    useEffect(() => {
        //Set timeout of 500ms to let the user know if the entered details do not match the format.
        let timer = setTimeout(async () => {

            //Regular expression for email
            let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (!email.match(pattern)) {
                trackInvalidEmail(true);
            }
            else {
                trackInvalidEmail(false);
            }
        }, 500);

        //Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
        return () => {
            clearTimeout(timer);
        };
    },
        [email]
    );

    //When either the email or password field changes through user input, the data corresponding to that name field is updated
    const handleChange = (event) => {
        setEmail(event.target.value);
    }
    return (
        <section className='text-center vh-100' style={{ backgroundColor: 'rgb(96, 165, 207)', height: '100%', overflowY: 'scroll' }}>
            <div className='container-fluid' >
                <div className="container py-5 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100" >
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }} >
                                <ToastContainer />
                                <div className="card-body p-5 text-center" style={{ backgroundColor: 'rgb(249, 243, 195)', borderRadius: '1rem' }}>
                                    <Form method='post' onSubmit={handleSubmit}>

                                        <h3 className="mb-5"> <button className='btn btn-danger' onClick={() => navigate('../')}>&lt;</button>Forgot Password</h3>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="typeEmailX-2" className="form-control form-control-lg" name="email" onChange={handleChange} required />
                                            <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                            <span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidEmail == true ? 'block' : 'none') }}>Please enter the correct Email</span>
                                        </div>
                                        <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={trackInvalidEmail}>Change Password</button>
                                    </Form>
                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
