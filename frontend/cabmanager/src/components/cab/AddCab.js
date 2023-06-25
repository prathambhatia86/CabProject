import { useCallback, useEffect, useState,useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import styles from "../../css/driverPageAdmin.module.css"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { motion } from "framer-motion";
//Url to make API request from our server
const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */
export default function Cab(props) {
	const user = useSelector(state => state.user.user);
	const ref = useRef();
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
	const [capacity, changeCapacity] = useState("");
	const [reading, changeReading] = useState("");
	const [insuranceNo, changeInsuranceNo] = useState(null);
	const [insuranceCompany, changeInsuranceCompany] = useState(null);
	const [insuranceAmount, changeInsuranceAmount] = useState(null);
	const [insuranceExpirationDate, changeInsuranceExpiration] = useState(null);
	const [insuranceNextPayment, changeNextPayment] = useState(null);
	const [pollutionId, changePollutionID] = useState(null);
	const [pollutionExpirationDate, changePollutionExpiration] = useState(null);
	const [image, changeImage] = useState(null);
	const [invalidImage, trackInvalidImage] = useState(true);
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
	const CapacityAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeCapacity(event.target.value);
	}
	const ReadingAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeReading(event.target.value);
	}
	const insuranceNumberAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeInsuranceNo(event.target.value);
	}
	const insuranceCompanyAltered = (event) => {
		changeInsuranceCompany(event.target.value);
	}
	const insuranceAmountAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeInsuranceAmount(parseInt(event.target.value));
	}
	const insurancePaymentAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeNextPayment(new Date(event.target.value));
	}
	const insuranceExpirationAltered = (event) => {
		changeInsuranceExpiration(new Date(event.target.value));
	}
	const pollutionIDAltered = (event) => {
		changePollutionID(event.target.value);
	}
	const pollutionExpirationAltered = (event) => {
		changePollutionExpiration(new Date(event.target.value));
	}
	const ImageAltered = (event) => {
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.onloadend = function () {
			changeImage(reader.result);
			trackInvalidImage(false);//image is selected
		}
		reader.readAsDataURL(file);
	}


	//States which track if any of the data field still does not match the required format
	const [invalidRegNumber, trackInvalidRegNumber] = useState(false);
	const [cabAlreadyExist, trackCabAlreadyExist] = useState(false);
	const [invalidModel, trackInvalidModel] = useState(false);
	const [invalidCapacity, trackInvalidCapacity] = useState(false);
	const [invalidColor, trackInvalidColor] = useState(false);
	const [invalidReading, trackInvalidReading] = useState(false);
	const [invalidInsuranceNo, trackInvalidInsuranceNo] = useState(true);
	const [invalidInsuranceCompany, trackInvalidInsuranceCompany] = useState(true);
	const [invalidInsuranceAmount, trackInvalidInsuranceAmount] = useState(true);
	const [invalidInsuranceExpiry, trackInvalidInsuranceExpiry] = useState(true);
	const [invalidInsuranceNext, trackInvalidInsuranceNext] = useState(true);
	const [invalidPollutionID, trackInvalidPollutionID] = useState(true);
	const [invalidPollutionExpiry, trackInvalidPollutionExpiry] = useState(true);

	//Check for duplicacy in Cab registration Number.
	const checkCabAlreadyExist = useCallback(async (reg) => {
		const values = {
			registration_no: reg,
		}
		try {
			return await axios.post(`${API_URL}/checkCabExists`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				},
			}
			)
		} catch (err) {
			toast("something wrong has happened when connecting to servers");
		}
	}, [user]);

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
				//Validate that the same cab hasnt been added to the database already.
				const response = await checkCabAlreadyExist(regNumber);
				if (response && response.data)
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
			//capacity should be between 1 and 2(inclusive)
			if(capacity.trim().length<1||capacity.trim().length>2)
			trackInvalidCapacity(true);
			else
			trackInvalidCapacity(false);
			//Color must have non-zero length
			if (color.trim().length == 0) {
				trackInvalidColor(true);
			}
			else
				trackInvalidColor(false);

			if (reading.length == 0 || Number.isNaN(parseInt(reading))) trackInvalidReading(true);
			else trackInvalidReading(false);
		}, 500);

		//Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
		return () => {
			clearTimeout(timer);
		};
	},
		[color, reading, regNumber, model,capacity,image, checkCabAlreadyExist]
	);
	useEffect(() => {
		if (!isInsured) return;
		//Set timeout of 500ms to let the user know if the entered details do not match the format.
		let timer = setTimeout(async () => {
			if (!insuranceAmount || Number.isNaN(insuranceAmount)) trackInvalidInsuranceAmount(true);
			else trackInvalidInsuranceAmount(false);
			if (!insuranceExpirationDate) trackInvalidInsuranceExpiry(true);
			else trackInvalidInsuranceExpiry(false);
			if (!insuranceCompany || insuranceCompany.length == 0) trackInvalidInsuranceCompany(true);
			else trackInvalidInsuranceCompany(false);
			if (!insuranceNo || insuranceNo.length == 0) trackInvalidInsuranceNo(true);
			else trackInvalidInsuranceNo(false);
			if (!insuranceNextPayment) trackInvalidInsuranceNext(true);
			else trackInvalidInsuranceNext(false);
		}, 500);
		//Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
		return () => {
			clearTimeout(timer);
		};

	}, [isInsured, insuranceNo, insuranceAmount, insuranceCompany, insuranceExpirationDate, insuranceNextPayment])
	useEffect(() => {
		if (!isPollution) return;
		//Set timeout of 500ms to let the user know if the entered details do not match the format.
		let timer = setTimeout(async () => {
			if (!pollutionId || pollutionId == 0) trackInvalidPollutionID(true);
			else trackInvalidPollutionID(false);
			if (!pollutionExpirationDate) trackInvalidPollutionExpiry(true);
			else trackInvalidPollutionExpiry(false);
		}, 500);
		//Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
		return () => {
			clearTimeout(timer);
		};

	}, [isPollution, pollutionId, pollutionExpirationDate]);
	//Return if not authorised
	if (!user || !user.isAuth) return;

	//State which helps to disable button if any format still mismatches
	let blockButton = (invalidRegNumber | invalidModel |invalidCapacity| invalidColor | cabAlreadyExist | invalidReading|invalidImage);
	blockButton |= (isInsured ? (invalidInsuranceNo | invalidInsuranceAmount | invalidInsuranceExpiry | invalidInsuranceNext | invalidInsuranceCompany) : false);
	blockButton |= (isPollution ? (invalidPollutionID | invalidPollutionExpiry) : false);


	//Make a request to the server to add this driver
	const submitResponse = async (event) => {
		document.getElementById('addCabSubmit').disabled = true;
		let values = {
			registration_no: regNumber,
			model: model,
			capacity:capacity,
			color: color,
			odometer: reading
		}
		//Add insurance
		if (isInsured) {
			values.insurance = {
				policy_number: insuranceNo,
				company: insuranceCompany,
				expires: insuranceExpirationDate,
				next_payment: insuranceNextPayment,
				amount: insuranceAmount,
			}
		}
		//Add Pollution Certificate
		if (isPollution) {
			values.pollution = {
				id: pollutionId,
				expires: pollutionExpirationDate,
			}
		}
		if (image) {
			values.image = image;
		}
		try {
			const response = await axios.post(`${API_URL}/addCab`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				}
			}
			);
			if (response && response.data) {
				toast("form submitted"); //alert
				ref.current.value = ""
				changeNum("");
				changeColor("");
				changeModel("");
				changeCapacity("");
				changeImage("");
				trackInvalidImage(true);
				changeInsuranceAmount(null);
				changeInsuranceCompany(null);
				changeInsuranceExpiration(null);
				changeInsuranceNo(null);
				changeNextPayment(null);
				changePollutionExpiration(null);
				changePollutionID(null);
				changeReading("");
				changeInsured(false);
				changePollution(false);
				
			}
			else {
				toast("something wrong has happened");
				document.getElementById('addCabSubmit').disabled = false;
			}
		} catch (err) {
			toast("something wrong has happened");
		}
	}

	return (

		<motion.section className="vh-100"    initial={{ scale: 0 }}
		animate={{ rotate: 360, scale: 1 }}
		transition={{
		  type: "spring",
		  stiffness: 260,
		  damping: 100
		}}>
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
										<input type="text" className="form-control form-control-lg" onChange={Numberaltered} value={regNumber}/>
									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidRegNumber == true ? 'block' : 'none') }}>Please enter the correct number</span>
								<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (cabAlreadyExist == true ? 'block' : 'none') }}>Sorry!This Cab already exists.</span>
								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab model</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={ModelAltered} value={model} />

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

										<input type="text" className="form-control form-control-lg" onChange={ColorAltered} value={color} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidColor == true ? 'block' : 'none') }}>Please enter the correct color</span>

								<hr className="mx-n3" />
								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab capacity</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text"  pattern="[0-9]+" className="form-control form-control-lg" onChange={CapacityAltered}  required value={capacity} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidCapacity == true ? 'block' : 'none') }}>Please enter the correct capacity(1-99)</span>
								<hr className="mx-n3" />
								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Current Odometer Reading</h6>

									</div>
									<div className="col-md-9 pe-5">
										<input type="text" className="form-control form-control-lg" onChange={ReadingAltered} value={reading} />
									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidReading == true ? 'block' : 'none') }}>Please enter the correct reading</span>
								<hr className="mx-n3" />
								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder">Cab Image</h6>

									</div>
									<div className="col-md-9 pe-5">
										<input type="file" className="form-control form-control-lg"  ref={ref} accept="image/*" onChange={ImageAltered}  />
									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidImage== true ? 'block' : 'none') }}>Please select the image!</span>
								<hr className="mx-n3" />
								<div className='container border border-warning-subtle rounded' id='Insurancediv' style={{ display: (isInsured ? 'block' : 'none') }}>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Policy Number</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={insuranceNumberAltered} value={insuranceNo}/>
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceNo == true ? 'block' : 'none') }}>Please enter the correct number</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Company</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={insuranceCompanyAltered} value={insuranceCompany} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceCompany == true ? 'block' : 'none') }}>Please enter the correct company</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Amount</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={insuranceAmountAltered} value={insuranceAmount} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceAmount == true ? 'block' : 'none') }}>Please enter the correct amount</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Expiration Date</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="date" className="form-control form-control-lg" onChange={insuranceExpirationAltered} value={insuranceExpirationDate} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceExpiry == true ? 'block' : 'none') }}>Please Choose a valid date</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Next Payment On</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="date" className="form-control form-control-lg" onChange={insurancePaymentAltered} value={insuranceNextPayment}/>
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceNext == true ? 'block' : 'none') }}>Please Choose a valid date</span>
								</div>
								<div className='container border border-warning-subtle rounded my-2' id='Pollutiondiv' style={{ display: (isPollution ? 'block' : 'none') }}>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Pollution Certificate ID</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="text" className="form-control form-control-lg" onChange={pollutionIDAltered} value={pollutionId} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidPollutionID == true ? 'block' : 'none') }}>Please enter the correct ID</span>
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">
											<h6 className="mb-0 fw-bolder">Expiration Date</h6>
										</div>
										<div className="col-md-9 pe-5">
											<input type="date" id="expire" className="form-control form-control-lg" onChange={pollutionExpirationAltered} value={pollutionExpirationDate} />
										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidPollutionExpiry == true ? 'block' : 'none') }}>Please Choose a Valid date</span>
								</div>

								<div className="px-5 py-4 text-center row">
									<div className="col-sm-2 my-2">
										<input className="form-check-input" type="checkbox" value={isInsured} id="insuranceCheckbox" onClick={handleInsuranceCheckbox} />
										<label className="form-check-label" htmlFor="insuranceCheckbox">
											Cab Insured?
										</label>
									</div>
									<div className="col-sm-2 my-2">
										<input className="form-check-input" type="checkbox" value={isPollution} id="PollutionCheckbox" onClick={handlePollutionCheckbox} />
										<label className="form-check-label" htmlFor="PollutionCheckbox">
											Pollution
										</label>
									</div>
									<div className="col-sm-8">
										<button type="submit" className="btn btn-primary btn-lg" disabled={blockButton} onClick={submitResponse} id='addCabSubmit'>Submit</button>
									</div>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>
		</motion.section>

	)
}