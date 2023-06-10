import React from 'react'
import { useParams } from 'react-router'

export default function DriverHomePage() {
    const { id } = useParams();
    return (
        <div>
            Hey i am {id};
        </div>
    )
}
