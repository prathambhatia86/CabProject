import { useEffect, useState } from "react";
import styles from "../../css/driverPageAdmin.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Url to make API request from our server
const API_URL = 'http://localhost:5000';

export default function Driver(props) {
	//React states to hold driver data.
	const [email, changeEmail] = useState("");
	const [password, changePassword] = useState("");
	const [name, changeName] = useState("");
	const [contact, changeContact] = useState("");

	//OnClick functions to change value of states on User input.
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
		//Remove all non-numeric characters
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		changeContact(event.target.value);
	}

	//States which track if any of the data field still does not match the required format
	const [invalidEmail, trackInvalidEmail] = useState(false);
	const [emailAlreadyExist, trackEmailAlreadyExist] = useState(false);
	const [invalidPassword, trackInvalidPassword] = useState(false);
	const [invalidName, trackInvalidName] = useState(false);
	const [invalidContact, trackInvalidContact] = useState(false);
	//  const [blockButton,trackInvalidButton]=useState(false);


	//Check for duplicacy in driver email.
	const checkEmailAlreadyExist = async (email) => {
		const values = {
			email: email,
		}
		return await fetch(`${API_URL}/checkDriverlogin`, {
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

			//Regular expression for email
			let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if (!email.match(pattern)) {
				trackInvalidEmail(true);
			}
			else {
				const response = await checkEmailAlreadyExist(email);

				if (await response.json())
					trackEmailAlreadyExist(true);
				else {
					trackEmailAlreadyExist(false);
				}
				trackInvalidEmail(false);
			}

			//Minimum password length is 6
			if (password.trim().length < 6) {
				trackInvalidPassword(true);
			}
			else
				trackInvalidPassword(false);

			//Name must have non-zero length
			if (name.trim().length == 0) {
				trackInvalidName(true);
			}
			else
				trackInvalidName(false);

			//Contact length must be 10 digits
			if (contact.trim().length != 10) {
				trackInvalidContact(true);
			}
			else
				trackInvalidContact(false);

		}, 500);

		//Clear the timeout to prevent rerendering continously, if the next change is within 500ms.
		return () => {
			clearTimeout(timer);
		};
	},
		[email, password, name, contact]
	);

	//State which helps to disable button if any format still mismatches
	let blockButton = (invalidContact | invalidEmail | invalidName | invalidPassword | emailAlreadyExist);

	//Make a request to the server to add this driver
	const submitResponse = async (event) => {
		const values = {
			name: name,
			email: email,
			password: password,
			contact: contact,
		}

	
		const response= await fetch(`${API_URL}/driverRegistration`, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values),
		}
		)
		if(response)
		{toast("form submitted");
		changeEmail("");
		changeContact("");
		changePassword("");
		changeName("");
	}
		else
		toast("something wrong has happened");
		
	}
	return (

		<section className="vh-100">
			     <ToastContainer />
			<div className="container h-100">
				<div className="row d-flex justify-content-center  h-100">
					<div className="col-xl-9">

						<div className="card" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
							<h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Driver Details</h1>
							<div className="card-body">

								<div className="row align-items-center pt-2 pb-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder text-center">Driver name</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" className="form-control form-control-lg" onChange={nameAltered} value={name}/>

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidName == true ? 'block' : 'none') }}>Please enter the correct name</span>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder  text-center">Driver E-mail</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="email" className="form-control form-control-lg" onChange={emailAltered} value={email}/>

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidEmail == true ? 'block' : 'none') }}>Please enter the correct email</span>
								<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (emailAlreadyExist == true ? 'block' : 'none') }}>Sorry!This email already exist.</span>
								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder  text-center">Driver password</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="password" className="form-control form-control-lg" onChange={passwordAltered} value={password}/>

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidPassword == true ? 'block' : 'none') }}>Please enter the correct password</span>

								<hr className="mx-n3" />

								<div className="row align-items-center py-3">
									<div className="col-md-3 ps-5">

										<h6 className="mb-0 fw-bolder  text-center">Driver mobile number</h6>

									</div>
									<div className="col-md-9 pe-5">

										<input type="text" pattern="[0-9]+" className="form-control form-control-lg" onChange={contactAltered} value={contact} />

									</div>
								</div>
								{/* Text which will only be visible when format is not adhered to */}
								<span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidContact == true ? 'block' : 'none') }}>Please enter the correct mobile number</span>

								<hr className="mx-n3" />

								<div className="px-5 py-4 text-center">
									<button type="submit" className="btn btn-primary btn-lg" onClick={submitResponse} disabled={blockButton}>Submit</button>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	)
}