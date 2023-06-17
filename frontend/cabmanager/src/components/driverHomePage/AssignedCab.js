import React from 'react'

export default function AssignedCab() {
    return (
        <div className="card mx-5 px-5 mb-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", height: "95%" }} >
            <div className='h3 text-black fw-bolder text-center py-5'>
                View your assigned Cab
            </div>
            <div className="card mb-5 " >
                <div className="row g-0">
                    <div className="col-md-5 mx-2 ">
                        <img src="https://th.bing.com/th/id/OIP.1ZB6rZ5hTMhm6o3wJ9x5RQHaFU?w=267&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7" className="img-fluid rounded-start px-2 py-1" alt="..." style={{ width: '100%' }} />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title mt-2">Cab Number:</h5>
                            <p className="card-text mt-4">Cab Model:</p>
                            <p className="card-text ">Cab Color:</p>
                            {/*Modals are needed to give details regarding insurance/pollution certificate after being prompted. */}
                            <div class="btn-group mt-5 flex-wrap">
                                <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                                    View Insurance Details
                                </button>
                                <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Pollution">
                                    View Pollution Details
                                </button>
                                <button type="button" className="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#Insurance">
                                    View /*Something*/ Details
                                </button>
                            </div>
                            <div className='modal' id="Insurance">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Insurance details for /*Cab Number*/</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                                        /*Data Here*/
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='modal' id="Pollution">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Pollution details for /*Cab Number*/</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                                        /*Data Here*/
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="card-text"><small className="text-muted">Assigned to You on : /*Date here*/</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
