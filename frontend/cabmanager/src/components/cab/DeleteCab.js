import { useCallback, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import styles from "../../css/driverPageAdmin.module.css"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { motion } from "framer-motion";
import { RotatingLines } from 'react-loader-spinner';
//Url to make API request from our server
const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */
export default function DeleteCab(props) {
	const user = useSelector(state => state.user.user);
	const ref = useRef();
	//React states to show/hide insurance or pollution divs


	//React states to hold cab data.
	const [regNumber, changeNum] = useState("");
	const [model, changeModel] = useState("");
	const [color, changeColor] = useState("");
	const [capacity, changeCapacity] = useState("");
	const [reading, changeReading] = useState("");
	const [loading, changeLoading] = useState(true);
	const [formState, changeFormState] = useState(false);
	const [id, getId] = useState(null);

	//States which track if any of the data field still does not match the required format

	const [userData, changeUserData] = useState(null);//userdata fetched from database
	const [selectedUser, changeSelectedUser] = useState(null); //selected in the typeahead

	let userDataSelectedFunction = (selectedValue) => {
		if (selectedValue.length == 0)
			return;
		if (!formState)
			changeFormState(true);
		getId(selectedValue[0]._id)
		changeNum(selectedValue[0].registration_no);
		changeModel(selectedValue[0].model);
		changeCapacity(selectedValue[0].capacity.toString());
		changeColor(selectedValue[0].color);
		changeReading(selectedValue[0].odometer.toString());


	}

	const getResponse = useCallback(async (event) => {
		try {
			let response = await axios.get(`${API_URL}/cabDataForDeletion`, {
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

	//Return if not authorised
	if (!user || !user.isAuth) return;




	//Make a request to the server to delte
	const submitResponse = async (event) => {
		document.getElementById('addCabSubmit').disabled = true;
		let values = {
			id: id,
		}

		try {
			const response = await axios.post(`${API_URL}/deleteCab`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				}
			}
			);
			if (response && response.data) {
				toast("form submitted"); //alert
				document.getElementById('addCabSubmit').disabled = false;
				changeFormState("false");


			}
			else {
				toast("something wrong has happened");
				document.getElementById('addCabSubmit').disabled = false;
			}
		} catch (err) {
			toast("something wrong has happened");
		}
	}
	const ConfirmResponse = () => {    //confirmation
		confirmAlert({
			title: 'Confirm to Delete',
			message: 'Are you sure to remove a CAB.',
			buttons: [
				{
					label: 'Yes',
					onClick: submitResponse
				},
				{
					label: 'No',

				}
			]
		})
	};
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
									placeholder="Delete the cab"

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
												<h1 className="text-yellow mb-4 text-center py-4" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>View Cab Details</h1>
												<div className="card-body">
													<div className="row align-items-center pt-4 pb-3">
														<div className="col-md-3 ps-5">
															<h6 className=" mb-0 fw-bolder">Cab registration no.</h6>
															<em className=" mb-0 fw-light"><small>(<a href="https://tinyurl.com/ysuphhm5" target="blank">Format</a> : XX XX XX XXXX)</small></em>
														</div>
														<div className="col-md-9 pe-5">
															<input type="text" className="form-control form-control-lg" disabled value={regNumber} />
														</div>
													</div>

													<hr className="mx-n3" />

													<div className="row align-items-center py-3">
														<div className="col-md-3 ps-5">

															<h6 className="mb-0 fw-bolder">Cab model</h6>

														</div>
														<div className="col-md-9 pe-5">

															<input type="text" className="form-control form-control-lg" disabled value={model} />

														</div>
													</div>


													<hr className="mx-n3" />

													<div className="row align-items-center py-3">
														<div className="col-md-3 ps-5">

															<h6 className="mb-0 fw-bolder">Cab colour</h6>

														</div>
														<div className="col-md-9 pe-5">

															<input type="text" className="form-control form-control-lg" disabled value={color} />

														</div>
													</div>


													<hr className="mx-n3" />
													<div className="row align-items-center py-3">
														<div className="col-md-3 ps-5">

															<h6 className="mb-0 fw-bolder">Cab capacity</h6>

														</div>
														<div className="col-md-9 pe-5">

															<input type="text" pattern="[0-9]+" className="form-control form-control-lg" disabled required value={capacity} />

														</div>
													</div>

													<hr className="mx-n3" />
													<div className="row align-items-center py-3">
														<div className="col-md-3 ps-5">

															<h6 className="mb-0 fw-bolder">Current Odometer Reading</h6>

														</div>
														<div className="col-md-9 pe-5">
															<input type="text" className="form-control form-control-lg" disabled value={reading} />
														</div>
													</div>


													<hr className="mx-n3" />







													<div className="col-sm-8">
														<button type="submit" className="btn btn-primary btn-lg" onClick={ConfirmResponse} id='addCabSubmit'>Delete</button>
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