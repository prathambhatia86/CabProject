export default function Driver(props) {
  if (props.select !== '1')
    return ('');
  return (

    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center  h-100">
          <div className="col-xl-9">

            <div className="card" style={{ borderRadius: '15px' }}>
              <h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Driver Details</h1>
              <div className="card-body">

                <div className="row align-items-center pt-4 pb-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver name</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" />

                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver ID-number</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" />

                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver E-mail</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="email" className="form-control form-control-lg" />

                  </div>
                </div>

                <hr className="mx-n3" />

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver mobile number</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" />

                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="px-5 py-4 text-center">
                  <button type="submit" className="btn btn-primary btn-lg" >Submit</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}