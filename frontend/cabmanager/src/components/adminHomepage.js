import { useState } from "react";
import styles from "../css/adminHomepage.module.css"
import AddCab from "./cab/AddCab";
import AddDriver from "./driver/AddDriver";
import UpdateDriver from "./driver/UpdateDriver";

import RemoveDriver from "./driver/DeleteDriver";

import CabAssignments from "./updateCab/UpdateCab";
import DriverAssignments from "./updateDriver/UpdateDriver";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from './store/user';

export default function AdminHomepage(props) {

	//Using the useNavigate hook to redirect to another url
	const navigate = useNavigate();

	//dipatcher for login to store current user in the redux store.
	const dispatch = useDispatch();

	//React State for determining the currently navigation status
	const [navState, changeNavState] = useState(false);

	//React State for determining the current view 
	const [selectedState, changeSelectedState] = useState(1);

	//Change the Navigation state to close/open sidebar
	const toggleNav = () => {
		changeNavState((prev) => {
			return (!prev);
		});
	}

	//Reset the sidebar to default state
	const sidebarReset = () => {
		changeNavState(false);
		if (document.getElementById('driverSidebar').classList.contains("show")) document.getElementById('driverSidebar').classList.toggle("show");
		if (document.getElementById('cabSidebar').classList.contains("show")) document.getElementById('cabSidebar').classList.toggle("show")
	}

	//onClick functions to change current view to another view.
	const driverAdd = () => {
		changeSelectedState(1);
		changeNavState(false);
		sidebarReset();
	}
	const driverUpdate = () => {
		changeSelectedState(2);
		changeNavState(false);
		sidebarReset();
	}
	const driverDelete = () => {
		changeSelectedState(3);
		changeNavState(false);
		sidebarReset();
	}
	const cabAdd = () => {
		changeSelectedState(4);
		changeNavState(false);
		sidebarReset();
	}
	const cabUpdate = () => {
		changeSelectedState(5);
		changeNavState(false);
		sidebarReset();
	}
	const cabDelete = () => {
		changeSelectedState(6);
		changeNavState(false);
	}
	const driverAssignments = () => {
		changeSelectedState(7);
		changeNavState(false);
	}
	const cabAssignments = () => {
		changeSelectedState(8);
		changeNavState(false);
	}


	//logout the user.
	const logoutUser = () => {
		dispatch(logout());
		navigate('../');
	}

	//Responsiveness Shenanigans
	let width = window.innerWidth;
	if (width >= 1250)
		width = 250
	return (
		<div>
			<div id="mySidebar" className={`${styles.sidebar}  `} style={{ width: (navState === true ? width : '0px') }}>
				<i className={`${styles.closebtn}`} onClick={toggleNav}>×</i>
				<br />
				<div>
					<span data-bs-toggle="collapse" data-bs-target="#driverSidebar">
						Driver ↧
					</span>
					<div className="container-fluid collapse row " id="driverSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
						<div className={`col ${styles.subMenuOptions}`} onClick={driverAdd}>
							enter new driver!
						</div>
						<div className={`col ${styles.subMenuOptions}`} onClick={driverUpdate}>
							Update driver details!
						</div>
						<div className={`col ${styles.subMenuOptions}`} onClick={driverDelete}>
							remove a driver!
						</div>
					</div>
				</div>
				<br />
				<div className="container">
					<span data-bs-toggle="collapse" data-bs-target="#cabSidebar">
						Cab ↧
					</span>
					<div className="container-fluid collapse row" id="cabSidebar" style={{ backgroundColor: 'rgb(255, 250, 149)' }}>
						<div className={`col ${styles.subMenuOptions}`} onClick={cabAdd}>
							Add Cab
						</div>
						<div className={`col ${styles.subMenuOptions}`} onClick={cabUpdate}>
							Update Cab
						</div>
						<div className={`col ${styles.subMenuOptions}`} onClick={cabDelete}>
							Delete Cab
						</div>
					</div>
				</div>
				<br />
				<div onClick={driverAssignments}>Driver Assignments</div>
				<br />
				<div onClick={cabAssignments} >Cab Assignments</div>
				<div className="position-relative bottom-0 text-danger" style={{ width: 'inherit' }} onClick={logoutUser}>Logout</div>
			</div>


			<button id="togglesidebar" className={`${styles.openbtn}`} style={{ display: (navState === true ? 'none' : 'block'), position: 'absolute' }} onClick={toggleNav} >☰</button>
			<div className="container-fluid" style={{ paddingTop: "4rem" }}>
				{selectedState == 1 ? <AddDriver /> : ''}
				{selectedState == 2 ? <UpdateDriver /> : ''}
				{selectedState == 3 ? <RemoveDriver /> : ''}
				{selectedState == 4 ? <AddCab /> : ''}
				{/*[TODO] Add a component for update cab, delete cab*/}
				{selectedState == 7 ? <DriverAssignments /> : ''}
				{selectedState == 8 ? <CabAssignments /> : ''}

			</div>
		</div >
	)
}
