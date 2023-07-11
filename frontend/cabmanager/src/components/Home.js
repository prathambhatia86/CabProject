import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import Navbar from './Navbar'
import Login from './registrationComponents/Login';

export default function Home() {
    //React state to determine whether admin/driver is loggin in
    const [current, setCurrent] = useState(0);

    //Change this url to the api call in backend.
    const [logURL, setURL] = useState("/adminlogin")

    //Change url to the correct login api
    useEffect(() => {
        if (current) {
            setURL("/driverlogin");
        } else {
            setURL("/adminlogin");
        }
    }, [current])
    return (
        <>
            <Navbar curr={current} changeCurr={setCurrent} />
            <section className='text-center vh-100' style={{ backgroundColor: 'rgb(96, 165, 207)', height: '100%', overflowY: 'scroll' }}>
                <div className='container-fluid' >
                    <Login action={logURL} curr={current} />
                </div>
            </section >
        </>
    )
}
