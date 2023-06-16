import { useEffect, useState } from "react";
import styles from "../../css/driverPageAdmin.module.css"
const API_URL = 'http://localhost:5000';
export default function Driver(props) {
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [name, changeName] = useState("");
  const [contact, changeContact] = useState("");
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
  //  const [blockButton,trackInvalidButton]=useState(false);
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
  let blockButton = (invalidContact | invalidEmail | invalidName | invalidPassword);
  const submitResponse = async (event) => {
    const values = {
      name: name,
      email: email,
      password: password,
      contact: contact,
    }
    return await fetch(`${API_URL}/driverRegistration`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
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

                    <h6 className="mb-0 fw-bolder text-center">Driver name</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" className="form-control form-control-lg" onChange={nameAltered} />

                  </div>
                </div>
                <span className={`help-block text-danger text-center ${styles.blink}`} style={{ display: (invalidName == true ? 'block' : 'none') }}>Please enter the correct name</span>
                <hr className="mx-n3" />




                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder  text-center">Driver E-mail</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="email" className="form-control form-control-lg" onChange={emailAltered} />

                  </div>
                </div>
                <span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidEmail == true ? 'block' : 'none') }}>Please enter the correct email</span>
                <hr className="mx-n3" />
                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder  text-center">Driver password</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="password" className="form-control form-control-lg" onChange={passwordAltered} />

                  </div>
                </div>
                <span className={`${styles.blink} help-block text-danger text-center`} style={{ display: (invalidPassword == true ? 'block' : 'none') }}>Please enter the correct password</span>
                <hr className="mx-n3" />

                <div className="row align-items-center py-3">
                  <div className="col-md-3 ps-5">

                    <h6 className="mb-0 fw-bolder  text-center">Driver mobile number</h6>

                  </div>
                  <div className="col-md-9 pe-5">

                    <input type="text" pattern="[0-9]+" className="form-control form-control-lg" onChange={contactAltered} />

                  </div>
                </div>
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