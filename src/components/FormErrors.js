import React, {Fragment} from 'react'

const FormErrors = ({errors}) => {
    return (
        <Fragment>
            {/* Conditionally render via && operator acting as if statement */}
            {errors &&
                <div className="text-center mt-3">
                    <ul className="list-unstyled text-danger">
                        {errors.map((message, index) => <li key={index}>{message}</li>)}
                    </ul>
                </div>
            }
        </Fragment>
    )
}

export default FormErrors