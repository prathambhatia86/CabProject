import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import Navbar from './Navbar'
import Login from './registrationComponents/Login';

export default function Home() {
    const [current, setCurrent] = useState(0);
    const [logURL, setURL] = useState("/adminlogin")
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
