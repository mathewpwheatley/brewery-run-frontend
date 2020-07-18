import React, {Fragment} from 'react'

const FormMessages = ({loading, errors}) => {
    return (
        <Fragment >
            {/* Conditionally render via && operator acting as if statement */}
            {loading &&
                <div className="text-center mt-4">
                    <span className="spinner-border spinner-border-sm text-primary"/>
                    <span className="d-none d-sm-none d-md-inline"> Loading</span>
                </div>
            }
            {/* Conditionally render via && operator acting as if statement */}
            {errors.length > 0 &&
                <div className="text-center mt-4">
                    <ul className="list-unstyled text-danger">
                        {errors.map((message, index) => <li key={index}>{message}</li>)}
                    </ul>
                </div>
            }
        </Fragment>
    )
}

export default FormMessages