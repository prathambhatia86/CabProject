import { useState } from "react";
const API_URL='http://localhost:5000';
export default function Driver(props) {
  const [email,changeEmail]=useState("");
  const [password,changePassword]=useState("");
  const [name,changeName]=useState("");
   const [contact,changeContact]=useState("");
   const nameAltered=(event)=>{
      changeName(event.target.value);
   }
   const emailAltered=(event)=>{
    changeEmail(event.target.value);
   }
   const passwordAltered=(event)=>{
    changePassword(event.target.value);
   }
   const contactAltered=(event)=>{
    changeContact(event.target.value);
   }
   const submitResponse=async(event)=>{
    const values={
        name:name,
        email:email,
        password:password,
        contact:contact,
    }
    return await fetch(`${API_URL}/driverRegistration`,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(values),
    }
    )
  }
  
  if (props.select !== '1')
    return ('');
  return (

    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center  h-100">
          <div className="col-xl-9">

            <div className="card" style={{ borderRadius: '15px', boxShadow: "2px 2px 4px rgb(104, 104, 0)" }}>
              <h1 className="text-yellow mb-4 py-4 text-center" style={{ textShadow: "0.5px 0.5px 0.5px Yellow" }}>Enter Driver Details</h1>
              <div className="card-body">

                <div className="row align-items-center pt-2 pb-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver name</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" onChange={nameAltered} />

                  </div>
                </div>

                <hr className="mx-n3" />


                

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver E-mail</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="email" className="form-control form-control-lg" onChange={emailAltered} />

                  </div>
                </div>

                <hr className="mx-n3" />
                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver password</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="password" className="form-control form-control-lg" onChange={passwordAltered}/>

                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder">Driver mobile number</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" onChange={contactAltered} />

                  </div>
                </div>

                <hr className="mx-n3" />

                <div className="px-5 py-4 text-center">
                  <button type="submit" className="btn btn-primary btn-lg" onClick={submitResponse}>Submit</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}