import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand mx-2 fw-semibold" to="#">Cab Managers</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <div className="nav-link" style={{cursor:'pointer'}} onClick={() => { props.changeCurr(0); }}>Admin Login<span className="sr-only">{!props.curr ? "(current)" : ""}</span></div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" style={{cursor:'pointer'}} onClick={() => { props.changeCurr(1); }}>Drivers Login<span className="sr-only">{props.curr ? "(current)" : ""}</span></div>
                        </li>
                    </ul>
                </div>
                <picture className='TaxiGif'>
                    <source media="(min-width:900px)" srcSet="https://www.bing.com/th/id/OGC.3d88f32bc7906648c3cf43f34e488531?pid=1.7&rurl=https%3a%2f%2fwww.animatedimages.org%2fdata%2fmedia%2f679%2fanimated-taxi-image-0007.gif&ehk=8VW4bfTgy1Dd%2fzPRt0vyocuZTsql3fy37%2bha9tZwlPI%3d" />
                    <source srcSet="" />
                    <img className='rounded  img-fluid float-end TaxiGif' style={{ minHeight: '5vh', maxHeight: '50px', float: 'right' }} alt='taxi-gif' />
                </picture>
            </nav>
        </div>
    )
}
