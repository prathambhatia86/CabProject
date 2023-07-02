import { useCallback, useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";
import { RotatingLines } from 'react-loader-spinner'
import styles from "../../css/driverPageAdmin.module.css"
const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */
export default function UpdateDriver(props) {
	const user = useSelector(state => state.user.user);

	const [loading, changeLoading] = useState(true);

	//React state for data of current driver selected for updation
	const [userData, changeUserData] = useState(null);

	//React state for current driver selected for updation
	const [selectedUser, changeSelectedUser] = useState(null);

	//React states for the data fields of the driver
	const [id, changeId] = useState("");
	const [email, changeEmail] = useState("");
	const [emailAlreadyExist, trackEmailAlreadyExist] = useState(false);
	const [name, changeName] = useState("");
	const [contact, changeContact] = useState("");
	const [formState, changeFormState] = useState(false);
	const [originalEmail, changeOriginalEmail] = useState(null);
	const nameAltered = (event) => {
		changeName(event.target.value);
	}
	const emailAltered = (event) => {
		changeEmail(event.target.value);
	}
	const contactAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeContact(event.target.value);
	}
	const [invalidEmail, trackInvalidEmail] = useState(false);
	const [invalidName, trackInvalidName] = useState(false);
	const [invalidContact, trackInvalidContact] = useState(false);
	const getResponse = useCallback(async (event) => {
		try {
			let response = await axios.get(`${API_URL}/driverNames`, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				},
			});
			let data = response.data;
			let newData = await data.map((val) => {
				val.label = val.name + '~' + val.email;
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
	const checkEmailAlreadyExist = useCallback(async (email) => {
		const values = {
			email: email,
		}
		try {
			return await axios.post(`${API_URL}/checkDriverlogin`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				},
			}
			);
		} catch (err) {
			toast("something wrong has happened when connecting to our servers");
		}
	}, [user]);
	useEffect(() => {

		let timer = setTimeout(async () => {
			let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if (email == originalEmail) {
				trackInvalidEmail(false);
				trackEmailAlreadyExist(false);
			}
			else if (!email.match(pattern)) {
				trackInvalidEmail(true);
			}
			else {
				const response = await checkEmailAlreadyExist(email);
				if (response && response.data)
					trackEmailAlreadyExist(true);
				else {
					trackEmailAlreadyExist(false);
				}
				trackInvalidEmail(false);
			}
			if (name.trim().length == 0) {
				trackInvalidName(true);
			}
			else
				trackInvalidName(false);
			if (contact.trim().length != 10) {
				trackInvalidContact(true);
			}
			else
				trackInvalidContact(false);
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	},
		[email, name, contact]
	);
	//Return if not authorised
	if (!user || !user.isAuth) return;
	let blockButton = (invalidContact | invalidEmail | invalidName);
	let userDataSelectedFunction = (selectedValue) => {
		if (selectedValue.length == 0)
			return;
		if (!formState)
			changeFormState(true);
		changeEmail(selectedValue[0].email);
		changeOriginalEmail(selectedValue[0].email)
		changeName(selectedValue[0].name);
		changeContact(selectedValue[0].contact.toString());
		changeId(selectedValue[0]._id);

	}
	const submitResponse = async (event) => {
		const values = {
			id: id,
			name: name,
			email: email,
			contact: contact,
		}
		try {
			const response = await axios.post(`${API_URL}/driverUpdate`, JSON.stringify(values), {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				}
			}
			)
			if (response) {
				toast("form updated");
				changeFormState(false);
			} //alert
			else
				toast("something wrong has occured");
		} catch (err) {
			toast("Some error occured, Please try again later");
		}

	}
	return (
		<>
			<ToastContainer />

			<section className="vh-100" >
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
									id="DriverIds"
									onChange={userDataSelectedFunction}
									options={userData}
									placeholder="Update the driver"
									selected={selectedUser}
								/>
							}
							<motion.div initial={{ scale: 0 }}
								animate={{ rotate: 0, scale: 1 }}
								transition={{
									ease: "linear",
									duration: 1,
									x: { duration: 1 }
								}} key={formState} className="card" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", display: (formState ? 'block' : 'none') }}>
								<h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Update Driver Details</h1>
								<div className="card-body ">

									<div className="row align-items-center pt-2 pb-3">
										<div className="col-md-3 ps-5">

											<h6 className="mb-0 fw-bolder">Driver name</h6>

										</div>
										<div className="col-md-9 pe-5">

											<input type="text" className="form-control form-control-lg" onChange={nameAltered} value={name} />

										</div>
									</div>
									<span className="help-block" style={{ display: (invalidName == true ? 'block' : 'none') }}>Please enter the correct name</span>
									<hr className="mx-n3" />
									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">

											<h6 className="mb-0 fw-bolder" value={email}>Driver E-mail</h6>

										</div>
										<div className="col-md-9 pe-5">

											<input type="email" className="form-control form-control-lg" onChange={emailAltered} value={email} />

										</div>
									</div>
									{/* Text which will only be visible when format is not adhered to */}
									<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidEmail == true ? 'block' : 'none') }}>Please enter the correct email</span>
									<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (emailAlreadyExist == true ? 'block' : 'none') }}>Sorry!This email already exists.</span>
									<hr className="mx-n3" />



									<div className="row align-items-center py-3">
										<div className="col-md-3 ps-5">

											<h6 className="mb-0 fw-bolder">Driver mobile number</h6>

										</div>
										<div className="col-md-9 pe-5">

											<input type="text" pattern="[0-9]+" className="form-control form-control-lg" onChange={contactAltered} value={contact} />

										</div>
									</div>
									<span className="help-block" style={{ display: (invalidContact == true ? 'block' : 'none') }}>Please enter the correct mobile number</span>
									<hr className="mx-n3" />

									<div className="px-5 py-4 text-center">
										<button type="submit" className="btn btn-primary btn-lg" disabled={blockButton} onClick={submitResponse}>Update</button>
									</div>

								</div>
							</motion.div>

						</div>
					</div>
				</div>
			</section>
		</>
	)
}