import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <section className='text-center vh-100' style={{ backgroundColor: 'rgb(96, 165, 207)', height: '100%', overflowY: 'scroll' }}>
            <div className='container-fluid' >
                <Outlet />
            </div>
        </section >
    )
}
