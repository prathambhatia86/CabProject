import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const user = useSelector(state => state.user.user);
    const [editingMode, changeMode] = useState(false);
    //React state to hold formdata
    const [formdata, setFormData] = useState({ name: user.name, email: user.email, password: user.password, contact: user.contact });
    //React state denoting if any change in driver details
    const [detailsChanged, setChange] = useState(true);

    //When any of the data field changes through user input, the data corresponding to that name field is updated
    const handleChange = (event) => {
        let newData = ({
            ...formdata, [event.target.name]: event.target.value
        });
        setFormData(newData);
        //If there is no change in user data, user will not be allowed to update
        if (!(user.email == newData.email && user.name == newData.name && user.contact == newData.contact)) setChange(false);
        else setChange(true);
    }

    //Allow user to change data if clicked on 'Edit details' button
    const enableEditing = () => {
        changeMode(true);
        document.getElementById('DriverEmail').readOnly = false;
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
                                <input type="text" data-toggle="tooltip" title="NOT allowed to edit names" name="name" className="form-control" id="DriverName" value={formdata.name} placeholder="Enter Name" onChange={handleChange} readOnly />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="DriverEmail" className="mb-0 fw-bolder text-center">Email</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" id="DriverEmail" name="email" value={formdata.email} placeholder="Enter Email" onChange={handleChange} readOnly />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="DriverContact" className="mb-0 fw-bolder text-center">Phone Number</label>
                            </div>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="DriverContact" name="contact" value={formdata.contact} placeholder="Enter Contact" onChange={handleChange} pattern="[0-9]{10}" readOnly />
                            </div>
                        </div>
                        <hr />
                        <div className='text-center my-2'>
                            <div className="btn-group align-content-center" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary rounded mx-1" onClick={enableEditing} disabled={editingMode}>Edit Details</button>
                                <button type="button" className="btn btn-primary rounded mx-1">Change Password</button>
                                <input type="submit" value="Save Changes" className="btn btn-primary rounded mx-1" disabled={editingMode ? detailsChanged : true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
