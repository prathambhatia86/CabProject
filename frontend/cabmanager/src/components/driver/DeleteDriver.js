import { useCallback, useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from "axios";
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";
const API_URL = 'https://localhost:5000';
/* eslint-disable eqeqeq */
export default function DeleteDriver(props) {
	const user = useSelector(state => state.user.user);

	//React state for data of current driver selected for updation
	const [userData, changeUserData] = useState(null);

	//React state for current driver selected for updation
	const [selectedUser, changeSelectedUser] = useState(null);

	//React states for the data fields of the driver
	const [id, changeId] = useState("");
	const [email, changeEmail] = useState("");
	const [password, changePassword] = useState("");
	const [name, changeName] = useState("");
	const [contact, changeContact] = useState("");
	const [formState, changeFormState] = useState(false);
	const nameAltered = (event) => {
		changeName(event.target.value);
	}
	const emailAltered = (event) => {
		changeEmail(event.target.value);
	}
	const passwordAltered = (event) => {

		changePassword(event.target.value);

	}
	const contactAltered = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeContact(event.target.value);
	}
	const [invalidEmail, trackInvalidEmail] = useState(false);
	const [invalidPassword, trackInvalidPassword] = useState(false);
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
		}
		catch {
			toast("Failed to fetch drivers from our servers");
		}
	}, [user]);

	useEffect(() => {
		getResponse();

	}, [formState, getResponse])
	useEffect(() => {

		let timer = setTimeout(() => {
			let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if (!email.match(pattern)) {
				trackInvalidEmail(true);
			}
			else
				trackInvalidEmail(false);
			if (password.trim().length < 6) {
				trackInvalidPassword(true);
			}
			else
				trackInvalidPassword(false);
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
		[email, password, name, contact]
	);
	//Return if not authorised
	if (!user || !user.isAuth) return;


	let blockButton = (invalidContact | invalidEmail | invalidName | invalidPassword);
	let userDataSelectedFunction = (selectedValue) => {
		if (selectedValue.length == 0)
			return;
		if (!formState)
			changeFormState(true);
		changeEmail(selectedValue[0].email);
		changePassword(selectedValue[0].password);
		changeName(selectedValue[0].name);
		changeContact(selectedValue[0].contact.toString());
		changeId(selectedValue[0]._id);

	}
	const submitResponse = async (event) => {
		const values = {
			id: id,
		}
		try {
			const response = await axios.delete(`${API_URL}/deleteDriver`, {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": user ? user.token : null
				},
				data: JSON.stringify(values)
			}
			)
			if (response && response.status == 200)
				toast("form deleted");   //alert
			else
				toast("something wrong has occured");
		} catch (err) {
			toast("Some error occured, Please try again later");
		}
		changeFormState(false);

	}
	const ConfirmResponse = () => {    //confirmation
		confirmAlert({
			title: 'Confirm to Delete',
			message: 'Are you sure to remove a driver.',
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
			{userData && (<>
				<section className="vh-100">
					<div className="container h-100">
						<div className="row d-flex justify-content-center  h-100">
							<div className="col-xl-11">
								<Typeahead
									id="DriverIds"
									onChange={userDataSelectedFunction}
									options={userData}
									placeholder="Delete the driver"
									selected={selectedUser}
								/>
								<motion.div  initial={{ scale: 0 }}
		animate={{ rotate: 360, scale: 1 }}
		transition={{
		  type: "spring",
		  stiffness: 260,
		  damping: 100
		}} key={formState} className="card" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)", display: (formState ? 'block' : 'none') }}>
									<h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Delete Driver Details</h1>
									<div className="card-body">

										<div className="row align-items-center pt-2 pb-3">
											<div className="col-md-3 ps-5">

												<h6 className="mb-0 fw-bolder">Driver name</h6>

											</div>
											<div className="col-md-9 pe-5">

												<input type="text" className="form-control form-control-lg" onChange={nameAltered} value={name} disabled />

											</div>
										</div>
										<span className="help-block" style={{ display: (invalidName == true ? 'block' : 'none') }}>Please enter the correct name</span>
										<hr className="mx-n3" />
										<div className="row align-items-center py-3">
											<div className="col-md-3 ps-5">

												<h6 className="mb-0 fw-bolder" value={email}>Driver E-mail</h6>

											</div>
											<div className="col-md-9 pe-5">

												<input type="email" className="form-control form-control-lg" onChange={emailAltered} value={email} disabled />

											</div>
										</div>
										<span className="help-block" style={{ display: (invalidEmail == true ? 'block' : 'none') }}>Please enter the correct email</span>
										<hr className="mx-n3" />
										<div className="row align-items-center py-3">
											<div className="col-md-3 ps-5">

												<h6 className="mb-0 fw-bolder">Driver password</h6>

											</div>
											<div className="col-md-9 pe-5">

												<input type="password" className="form-control form-control-lg" onChange={passwordAltered} value={password} disabled />

											</div>
										</div>
										<span className="help-block" style={{ display: (invalidPassword == true ? 'block' : 'none') }}>Please enter the correct password</span>
										<hr className="mx-n3" />

										<div className="row align-items-center py-3">
											<div className="col-md-3 ps-5">

												<h6 className="mb-0 fw-bolder">Driver mobile number</h6>

											</div>
											<div className="col-md-9 pe-5">

												<input type="text" pattern="[0-9]+" className="form-control form-control-lg" onChange={contactAltered} value={contact} disabled />

											</div>
										</div>
										<span className="help-block" style={{ display: (invalidContact == true ? 'block' : 'none') }}>Please enter the correct mobile number</span>
										<hr className="mx-n3" />

										<div className="px-5 py-4 text-center">
											<button type="submit" className="btn btn-primary btn-lg" disabled={blockButton} onClick={ConfirmResponse}>Delete</button>
										</div>

									</div>
								</motion.div>

							</div>
						</div>
					</div>
				</section> </>)}
		</>
	)
}