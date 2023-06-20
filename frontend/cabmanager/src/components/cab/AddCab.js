import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import styles from "../../css/driverPageAdmin.module.css"
import 'react-toastify/dist/ReactToastify.css';

//Url to make API request from our server
const API_URL = 'http://localhost:5000';

export default function Cab(props) {

	//React states to show/hide insurance or pollution divs
	const [isInsured, changeInsured] = useState(false);
	const [isPollution, changePollution] = useState(false);
	const handleInsuranceCheckbox = (event) => {
		changeInsured(event.target.checked);
	}
	const handlePollutionCheckbox = (event) => {
		changePollution(event.target.checked);
	}

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

	//States which track if any of the data field still does not match the required format
	const [invalidRegNumber, trackInvalidRegNumber] = useState(false);
	const [cabAlreadyExist, trackCabAlreadyExist] = useState(false);
	const [invalidModel, trackInvalidModel] = useState(false);
	const [invalidColor, trackInvalidColor] = useState(false);

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

	//On any change in data fields
	useEffect(() => {
		//Set timeout of 500ms to let the user know if the entered details do not match the format.
		let timer = setTimeout(async () => {
			//Regular expression for Indian commercial vehicles
			let pattern = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
			if (!regNumber.match(pattern)) {
				trackInvalidRegNumber(true);
			}
			else {
				const response = await checkCabAlreadyExist(regNumber);
				if (await response.json())
					trackCabAlreadyExist(true);
				else {
					trackCabAlreadyExist(false);
				}
				trackInvalidRegNumber(false);
			}

			//The model field must have an entry
			if (model.trim().length == 0) {
				trackInvalidModel(true);
			}
			else
				trackInvalidModel(false);

			//Color must have non-zero length
			if (color.trim().length == 0) {
				trackInvalidColor(true);
			}
			else
				trackInvalidColor(false);
		}, 500);

		//Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
		return () => {
			clearTimeout(timer);
		};
	},
		[color, regNumber, model]
	);

	//State which helps to disable button if any format still mismatches
	let blockButton = (invalidRegNumber | invalidModel | invalidColor | cabAlreadyExist);

	//Make a request to the server to add this driver
	const submitResponse = async (event) => {
		const values = {
			registration_no: regNumber,
			model: model,
			color: color,
		}


		const response = await fetch(`${API_URL}/addCab`, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values),
		}
		)
		if (response) {
			toast("form submitted"); //alert
			changeNum("");
			changeColor("");
			changeModel("");
		}
		else
			toast("something wrong has happened");
	}

	return (

		<section className="vh-100" >
			<ToastContainer />
			<div className="container h-100" >
				<div className="row d-flex justify-content-center  h-100">
					<div className="col-xl-9">

						<div className="card my-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }} >
							<h1 className="text-yellow mb-4 text-center py-4" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Cab Details</h1>
							<div className="card-body">
								<div className="row align-items-center pt-4 pb-3">
									<div className="col-md-3 ps-5">
										<h6 className=" mb-0 fw-bolder">Cab registration no.</h6>
										<em className=" mb-0 fw-light"><small>(<a href="https://tinyurl.com/ysuphhm5" target="blank">Format</a> : XX XX XX XXXX)</small></em>
									</div>
									<div className="col-md-9 pe-5">
										<input type="text" className="form-control form-control-lg" onChange={Numberaltered} />
									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidRegNumber == true ? 'block' : 'none') }}>Please enter the correct number</span>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab model</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ModelAltered} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidModel == true ? 'block' : 'none') }}>Please enter the correct model</span>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab colour</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct color</span>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Current Odometer Reading</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct reading</span>

								<hr className="mx-n3" />
								<div className='container border border-warning-subtle rounded' id='Insurancediv' style={{ display: (isInsured ? 'block' : 'none') }}>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Policy Number</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct reading</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Company</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct reading</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">

											<h6 className="mb-0 fw-bolder">Current Odometer Reading</h6>

										</div>
										<div className="col-md-9 pe-5">

											<input type="text" className="form-control form-control-lg" onChange={ColorAltered} />

										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct reading</span>

								</div>

								<div className="px-5 py-4 text-center row">
									<div className="col-sm-2 my-2">
										<input className="form-check-input" type="checkbox" value="" id="insuranceCheckbox" onClick={handleInsuranceCheckbox} />
										<label className="form-check-label" htmlFor="insuranceCheckbox">
											Cab Insured?
										</label>
									</div>
									<div className="col-sm-2 my-2">
										<input className="form-check-input" type="checkbox" value="" id="PollutionCheckbox" onClick={handlePollutionCheckbox} />
										<label className="form-check-label" htmlFor="PollutionCheckbox">
											Pollution
										</label>
									</div>
									<div className="col-sm-8">
										<button type="submit" className="btn btn-primary btn-lg" disabled={blockButton} onClick={submitResponse}>Submit</button>
									</div>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>
		</section>

	)
}