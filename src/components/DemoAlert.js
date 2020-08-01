import React from 'react'
import {Alert} from 'react-bootstrap'

const  DemoAlert = () => {
    return (
        <Alert variant="light">
            <h5>Brewery Run Demonstration: </h5>
            <p>Feel free to log in with the following credentials to further explore Brewery Run:</p>
            <ul>
                <li><strong>Email:</strong> email@domain.org</li>
                <li><strong>Password:</strong> password</li>
            </ul>
        </Alert>
    )
}

export default DemoAlert