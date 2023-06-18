import { useEffect, useState } from "react";

//Url to make API request from our server
const API_URL = 'http://localhost:5000';

export default function Cab(props) {
	//React states to hold cab data.
	const [regNumber, changeNum] = useState("");
	const [model, changeModel] = useState("");
	const [color, changeColor] = useState("");

	//OnClick functions to change value of states on User input.
	const Numberaltered = (event) => {
		changeNum(event.target.value);
	}
	const ModelAltered = (event) => {
		changeModel(event.target.value);
	}
	const ColorAltered = (event) => {
		changeColor(event.target.value);
	}

	//Check for duplicacy in Cab registration Number.
	const checkCabAlreadyExist = async (reg) => {
		const values = {
			registration_no: reg,
		}
		return await fetch(`${API_URL}/checkCabExists`, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values),
		}
		)
	}

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
										<input type="text" className="form-control form-control-lg" onChange={Numberaltered} />
									</div>
								</div>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab model</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ModelAltered} />

									</div>
								</div>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab colour</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />

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