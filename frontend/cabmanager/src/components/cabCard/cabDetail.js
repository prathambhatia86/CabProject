import React from 'react'

export default function CabDetail({ cab, driver }) {
    return (
        <div className="row g-0 justify-content-center">
            <div className="col-md-4 col-lg-3 col-sm-8 mx-2 " >
                <img src={cab.image} className="img-fluid rounded-start px-4 py-1" alt="..." style={{ width: '100%' }} />
            </div>
            <div className="col-md-8 px-5">
                <div className="card-body">
                    <h5 className="card-title mt-2">Cab Number:{cab.registration_no}</h5>
                    <p className="card-text mt-4">Cab Model:{cab.model}</p>
                    <p className="card-text ">Cab Color:{cab.color}</p>
                    <p className="card-text ">Odometer Reading:{cab.odometer} Kms</p>
                    {/*Modals are needed to give details regarding insurance/pollution certificate after being prompted. */}
                    <div className="btn-group mt-5 flex-wrap">
                        <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                            View Insurance Details
                        </button>
                        <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Pollution">
                            View Pollution Details
                        </button>
                    </div>
                    <div className='modal' id="Insurance">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Insurance details for {cab.registration_no}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {cab.insurance &&
                                    <div className="modal-body">
                                        <span className='font-monospace'>Policy Number : {cab.insurance.policy_number}</span><br />
                                        <span className='font-monospace'>Company : {cab.insurance.company}</span><br />
                                        <span className='font-monospace'>Expires : {cab.insurance.expires}</span><br />
                                        <span className='font-monospace'>Next Payment on : {cab.insurance.next_payment}</span><br />
                                        <span className='font-monospace'>Amount Payable : {cab.insurance.amount}</span><br />
                                    </div>
                                }
                                {!cab.insurance &&
                                    <div className="modal-body">
                                        <h3 className='text-danger'>No Insurance Details Found</h3>
                                    </div>
                                }
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal' id="Pollution">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Pollution details for {cab.registration_no}/</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {cab.pollution &&
                                    <div className="modal-body">
                                        <span className='font-monospace'>ID : {cab.pollution.id}</span><br />
                                        <span className='font-monospace'>Company : {cab.pollution.expires}</span><br />
                                    </div>
                                }
                                {!cab.pollution &&
                                    <div className="modal-body">
                                        <h3 className='text-danger'>No Pollution Details Found</h3>
                                    </div>
                                }
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
