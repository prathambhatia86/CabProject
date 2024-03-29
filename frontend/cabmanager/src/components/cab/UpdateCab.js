import { useCallback, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import styles from "../../css/driverPageAdmin.module.css"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { motion } from "framer-motion";
import { RotatingLines } from 'react-loader-spinner';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
//Url to make API request from our server
const API_URL = '';
/* eslint-disable eqeqeq */
export default function UpdateCab(props) {
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
	const [insuranceNo, changeInsuranceNo] = useState('');
	const [insuranceCompany, changeInsuranceCompany] = useState('');
	const [insuranceAmount, changeInsuranceAmount] = useState('');
	const [insuranceExpirationDate, changeInsuranceExpiration] = useState(new Date());
	const [insuranceNextPayment, changeNextPayment] = useState(new Date());
	const [pollutionId, changePollutionID] = useState('');
	const [pollutionExpirationDate, changePollutionExpiration] = useState(new Date());
	const [image, changeImage] = useState(null);
	const [invalidImage, trackInvalidImage] = useState(true);
	const [loading, changeLoading] = useState(true);
	const [formState, changeFormState] = useState(false);
	const [checkReg, changeCheckReg] = useState(null); //store original email to prevent it from being deemed invalid
	const [id, getId] = useState(null);
	const [defaultImage, changeDefaultImage] = useState(null);
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

		changeNextPayment((event.target.value));
	}
	const insuranceExpirationAltered = (event) => {
		changeInsuranceExpiration((event.target.value));
	}
	const pollutionIDAltered = (event) => {
		changePollutionID(event.target.value);
	}
	const pollutionExpirationAltered = (event) => {
		changePollutionExpiration((event.target.value));
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
	const [userData, changeUserData] = useState(null);//userdata fetched from database
	const [selectedUser, changeSelectedUser] = useState(null); //selected in the typeahead
	const [isInsuredAtStart, changeInsuredAtStart] = useState(false); //to block the user from unselecting it
	const [isPollutionAtStart, changePollutionAtStart] = useState(false);
	let userDataSelectedFunction = (selectedValue) => {
		if (selectedValue.length == 0)
			return;
		if (!formState)
			changeFormState(true);
		getId(selectedValue[0]._id)
		changeNum(selectedValue[0].registration_no);
		changeCheckReg(selectedValue[0].registration_no);
		changeModel(selectedValue[0].model);
		changeCapacity(selectedValue[0].capacity.toString());
		changeColor(selectedValue[0].color);
		changeReading(selectedValue[0].odometer.toString());
		if ("insurance" in selectedValue[0]) {
			changeInsured(true);
			changeInsuranceNo(selectedValue[0].insurance.policy_number);
			changeInsuranceCompany(selectedValue[0].insurance.company);
			changeInsuranceExpiration(selectedValue[0].insurance.expires);
			changeNextPayment(selectedValue[0].insurance.next_payment);
			changeInsuranceAmount(selectedValue[0].insurance.amount.toString());
			changeInsuredAtStart(true);
		}
		if ("pollution" in selectedValue[0]) {
			changePollutionAtStart(true);
			changePollution(true);
			changePollutionID(selectedValue[0].pollution.id);
			changePollutionExpiration(selectedValue[0].pollution.expires);
		}

	}
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
	const getResponse = useCallback(async (event) => {
		try {
			let response = await axios.get(`${API_URL}/cabDataWithoutImages`, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				},
			});
			let data = response.data;
			let newData = await data.map((val) => {
				val.label = val.model + '~' + val.registration_no;
				return val;
			})
			changeUserData(await newData);
			changeLoading(false);
		}
		catch {
			toast("Failed to fetch drivers from our servers");
		}
	}, [user]);
	useEffect(() => {
		getResponse();

	}, [formState, getResponse])
	//On any change in data fields
	useEffect(() => {
		//Set timeout of 500ms to let the user know if the entered details do not match the format.
		let timer = setTimeout(async () => {
			//Regular expression for Indian commercial vehicles
			let pattern = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;

			if (regNumber === checkReg) {
				trackInvalidRegNumber(false);
				trackCabAlreadyExist(false);
			}
			else if (!regNumber.match(pattern)) {
				trackInvalidRegNumber(true);
				trackCabAlreadyExist(false);
			}
			else {

				//Validate that the same cab hasnt been added to the database already.
				const response = await checkCabAlreadyExist(regNumber);
				if (response && response.data) {
					trackCabAlreadyExist(true);
					trackInvalidRegNumber(false);
				}
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
			if (capacity.trim().length < 1 || capacity.trim().length > 2)
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
		[color, reading, regNumber, model, capacity, image, checkCabAlreadyExist]
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
	let blockButton = (invalidRegNumber | invalidModel | invalidCapacity | invalidColor | cabAlreadyExist | invalidReading);
	blockButton |= (isInsured ? (invalidInsuranceNo | invalidInsuranceAmount | invalidInsuranceExpiry | invalidInsuranceNext | invalidInsuranceCompany) : false);
	blockButton |= (isPollution ? (invalidPollutionID | invalidPollutionExpiry) : false);


	//Make a request to the server to add this driver
	const submitResponse = async (event) => {
		document.getElementById('addCabSubmit').disabled = true;
		let values = {
			id: id,
			registration_no: regNumber,
			model: model,
			capacity: capacity,
			color: color,
			odometer: reading
		}
		// Add insurance
		if (isInsured) {
			values.insurance = {
				policy_number: insuranceNo,
				company: insuranceCompany,
				expires: new Date(insuranceExpirationDate),
				next_payment: new Date(insuranceNextPayment),
				amount: insuranceAmount,
			}
		}
		// Add Pollution Certificate
		if (isPollution) {
			values.pollution = {
				id: pollutionId,
				expires: new Date(pollutionExpirationDate),
			}
		}
		if (image) {
			values.image = image;
		}
		try {
			const response = await axios.post(`${API_URL}/updateCab`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				}
			}
			);
			if (response && response.data) {
				toast("form submitted"); //alert
				document.getElementById('addCabSubmit').disabled = false;
				changeCheckReg("regNumber");
				changeFormState("true");
				// ref.current.value = ""
				// changeNum("");
				// changeColor("");
				// changeModel("");
				// changeCapacity("");
				// changeImage("");
				// trackInvalidImage(true);
				// changeInsuranceAmount("");
				// changeInsuranceCompany("");
				// changeInsuranceExpiration("");
				// changeInsuranceNo("");
				// changeNextPayment("");
				// changePollutionExpiration("");
				// changePollutionID("");
				// changeReading("");
				// changeInsured(false);
				// changePollution(false);

			}
			else {
				toast("something wrong has happened");
				document.getElementById('addCabSubmit').disabled = false;
			}
		} catch (err) {
			toast("something wrong has happened");
		}
	}



	const getImageForPreview = async (event) => {
		if (defaultImage != null) {
			document.getElementById("imageId").click();
			return;
		}
		let values = {
			id: id,

		}
		try {
			const response = await axios.post(`${API_URL}/getCabImage`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				}
			}
			);
			if (response && response.data) {
				changeDefaultImage(response.data[0].image);
				document.getElementById("imageId").click();

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
		<>
			<ToastContainer />
			<section className="vh-100">
				<div className="container h-100">
					<div className="row d-flex justify-content-center  h-100">
						<div className="col-xl-11">
							{loading &&
								<div className="text-center">
									<RotatingLines
										strokeColor="grey"
										strokeWidth="5"
										animationDuration="0.75"
										width="96"
										visible={true}
									/>
								</div>}

							{!loading &&
								<Typeahead
									id="CabIds"
									onChange={userDataSelectedFunction}
									options={userData}
									placeholder="Update the cab"
									selected={selectedUser}
								/>
							}
							<motion.section className="vh-100" initial={{ scale: 0 }}
								animate={{ rotate: 0, scale: 1 }}
								transition={{
									ease: "linear",
									duration: 1,
									x: { duration: 1 }
								}} key={formState}>


								<div className="container h-100 my-2" >
									<div className="row d-flex justify-content-center  h-100">
										<div className="col-xl-11">

											<div className="card my-4" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", display: (formState ? 'block' : 'none') }} >
												<h1 className="text-yellow mb-4 text-center py-4" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Cab Details</h1>
												<div className="card-body">
													<div className="row align-items-center pt-4 pb-3">
														<div className="col-md-3 ps-5">
															<h6 className=" mb-0 fw-bolder">Cab registration no.</h6>
															<em className=" mb-0 fw-light"><small>(<a href="https://tinyurl.com/ysuphhm5" target="blank">Format</a> : XX XX XX XXXX)</small></em>
														</div>
														<div className="col-md-9 pe-5">
															<input type="text" className="form-control form-control-lg" onChange={Numberaltered} value={regNumber} />
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

															<input type="text" pattern="[0-9]+" className="form-control form-control-lg" onChange={CapacityAltered} required value={capacity} />

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
															<button type="button" class="btn btn-outline-primary btn-sm" onClick={getImageForPreview}>View existing image</button>
															<PhotoProvider>
																<PhotoView src={defaultImage}>
																	<button type="button" id="imageId" style={{ display: 'none' }} class="btn btn-outline-primary btn-sm"></button>
																</PhotoView>
															</PhotoProvider>
														</div>
														<div className="col-md-9 pe-5">

															<input type="file" className="form-control form-control-lg" ref={ref} accept="image/*" onChange={ImageAltered} />

														</div>
													</div>

													<hr className="mx-n3" />
													<div className='container border border-warning-subtle rounded' id='Insurancediv' style={{ display: (isInsured ? 'block' : 'none') }}>
														<div className="row align-items-center py-3">
															<div className="col-md-3 ps-5">
																<h6 className="mb-0 fw-bolder">Policy Number</h6>
															</div>
															<div className="col-md-9 pe-5">
																<input type="text" className="form-control form-control-lg" onChange={insuranceNumberAltered} value={insuranceNo} />
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
																<input type="date" className="form-control form-control-lg" value={new Date(insuranceExpirationDate).toISOString().slice(0, 10)} onChange={insuranceExpirationAltered} />
															</div>
														</div>
														{/* Text which will only be visible when format is not adhered to */}
														<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidInsuranceExpiry == true ? 'block' : 'none') }}>Please Choose a valid date</span>
														<div className="row align-items-center py-3">
															<div className="col-md-3 ps-5">
																<h6 className="mb-0 fw-bolder">Next Payment On</h6>
															</div>
															<div className="col-md-9 pe-5">
																<input type="date" className="form-control form-control-lg" value={new Date(insuranceNextPayment).toISOString().slice(0, 10)} onChange={insurancePaymentAltered} />
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
																<input type="date" id="expire" className="form-control form-control-lg" value={new Date(pollutionExpirationDate).toISOString().slice(0, 10)} onChange={pollutionExpirationAltered} />
															</div>
														</div>
														{/* Text which will only be visible when format is not adhered to */}
														<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidPollutionExpiry == true ? 'block' : 'none') }}>Please Choose a Valid date</span>
													</div>

													<div className="px-5 py-4 text-center row">
														<div className="col-sm-2 my-2">
															<input className="form-check-input" type="checkbox" checked={isInsured} disabled={isInsuredAtStart} id="insuranceCheckbox" onClick={handleInsuranceCheckbox} readOnly />
															<label className="form-check-label" htmlFor="insuranceCheckbox">
																Cab Insured?
															</label>
														</div>
														<div className="col-sm-2 my-2">
															<input className="form-check-input" type="checkbox" checked={isPollution} disabled={isPollutionAtStart} id="PollutionCheckbox" onClick={handlePollutionCheckbox} readOnly />
															<label className="form-check-label" htmlFor="PollutionCheckbox">
																Pollution
															</label>
														</div>
														<div className="col-sm-8">
															<button type="submit" className="btn btn-primary btn-lg" disabled={blockButton} onClick={submitResponse} id='addCabSubmit'>Update</button>
														</div>
													</div>

												</div>
											</div>

										</div>
									</div>
								</div>
							</motion.section>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}