import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from "../../css/driverPageAdmin.module.css"

export default function Profile() {
    const user = useSelector(state => state.user.user);
    const [editingMode, changeMode] = useState(false);
    //React state denoting if any change in driver details
    const [detailsChanged, setChange] = useState(true);

    const [email] = useState(user.email);
    const [name, changeName] = useState(user.name);
    const [contact, changeContact] = useState(`${user.contact}`);
    const nameAltered = (event) => {
        changeName(event.target.value);
    }
    const contactAltered = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        changeContact(event.target.value);
    }
    const [invalidEmail, trackInvalidEmail] = useState(false);
    const [invalidName, trackInvalidName] = useState(false);
    const [invalidContact, trackInvalidContact] = useState(false);
    useEffect(() => {

        let timer = setTimeout(() => {
            let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (!email.match(pattern)) {
                trackInvalidEmail(true);
            }
            else
                trackInvalidEmail(false);
            if (name.trim().length == 0) {
                trackInvalidName(true);
            }
            else
                trackInvalidName(false);
            if (contact.trim().length != 10) {
                trackInvalidContact(true);
            }
            else
                trackInvalidContact(false);
            if (!(user.name == name && user.contact == contact)) setChange(false);
            else setChange(true);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    },
        [email, name, contact, user]
    );

    let invalidDetails = (invalidContact | invalidName | invalidEmail);

    //Allow user to change data if clicked on 'Edit details' button
    const enableEditing = () => {
        changeMode(true);
        document.getElementById('DriverName').readOnly = false;
        document.getElementById('DriverContact').readOnly = false;
    }

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
                                <label htmlFor="DriverName" className="mb-0 fw-bolder text-center">Name</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text" data-toggle="tooltip" title="NOT allowed to edit names" name="name" className="form-control" id="DriverName" value={name} placeholder="Enter Name" onChange={nameAltered} readOnly />
                            </div>
                        </div>
                        <span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidName == true ? 'block' : 'none') }}>Please enter the correct Name</span>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="DriverEmail" className="mb-0 fw-bolder text-center">Email</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" id="DriverEmail" name="email" value={email} placeholder="Enter Email" readOnly />
                            </div>
                        </div>
                        <span className={`help-block text-info text-center ${styles.blink}`} style={{ display: 'block' }}>Emails Cannot be Edited</span>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="DriverContact" className="mb-0 fw-bolder text-center">Phone Number</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="DriverContact" name="contact" value={contact} placeholder="Enter Contact" onChange={contactAltered} pattern="[0-9]{10}" readOnly />
                            </div>
                        </div>
                        <span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidContact == true ? 'block' : 'none') }}>Please enter the correct Contact</span>
                        <hr />
                        <div className='text-center my-2'>
                            <div className="btn-group align-content-center" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary rounded mx-1" onClick={enableEditing} disabled={editingMode}>Edit Details</button>
                                <button type="button" className="btn btn-primary rounded mx-1" data-bs-toggle="modal" data-bs-target="#Changepwd">Change Password</button>
                                <input type="submit" value="Save Changes" className="btn btn-primary rounded mx-1" disabled={editingMode ? (detailsChanged || invalidDetails) : true} />
                            </div>
                        </div>
                        <div className='modal' id="Changepwd">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <h3 className='text-danger'>No Insurance Details Found</h3>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
