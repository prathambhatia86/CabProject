export default function Cab(props) {
	if (props.select !== '2')
		return ('');
	return (

		<section className="vh-100" >
			<div className="container h-100" >
				<div className="row d-flex justify-content-center  h-100">
					<div className="col-xl-9">

						<div className="card" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }} >
							<h1 className="text-yellow mb-4 text-center py-4" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Cab Details</h1>
							<div className="card-body">

								<div className="row align-items-center pt-4 pb-3">
									<div className="col-md-3 ps-5">

										<h6 className=" mb-0 fw-bolder">Cab registration no.</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" />

									</div>
								</div>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab model</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" />

									</div>
								</div>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab colour</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" />

									</div>
								</div>

								<hr className="mx-n3" />


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