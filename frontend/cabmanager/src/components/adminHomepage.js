import { useState } from "react";
import styles from "../css/adminHomepage.module.css"
import Cab from "./cab/Cab";
import Driver from "./driver/Driver";
import UpdateCab from "./updateCab/UpdateCab";
import UpdateDriver from "./updateDriver/UpdateDriver";
export default function AdminHomepage()
{
    const [navState,changeNavState]=useState(true);
    const [selectedState,changeSelectedState]=useState('1')
    const toggleNav=()=>{
        changeNavState((prev)=>{
            return (!prev);
        });
    }
    const driverDetails=()=>{
      changeSelectedState('1');
    }
    const cabDetails=()=>{
      changeSelectedState('2');
    }
    const driverChange=()=>{
      changeSelectedState('3');
    }
    const cabChange=()=>{
      changeSelectedState('4');
    }
    return(
    <div>
<div id="mySidebar" className= {`${styles.sidebar}`} style={{width:(navState===true?'250px':'0px')}}>
  <i  className= {`${styles.closebtn}`} onClick={toggleNav}>×</i>
  <br />
  <div onClick={driverDetails} >enter driver details</div>
  <br />
  <div onClick={cabDetails}>enter cab details</div>
  <br />
  <div onClick={driverChange}>update driver</div>
  <br />
  <div onClick={cabChange} >update cab</div>
</div>

<div id="main" style={{marginLeft:(navState===true?'250px':'0px')}}>
  <button id="togglesidebar" className= {`${styles.openbtn}`} style={{display:(navState===true?'none':'block')}} onClick={toggleNav} >☰</button>  
</div>
<Cab select={selectedState} />
<Driver select={selectedState} />
<UpdateCab select={selectedState} />
<UpdateDriver select={selectedState} />
</div>
    )
}
