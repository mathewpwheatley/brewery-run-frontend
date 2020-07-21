import React, {Fragment} from 'react'
import {connect} from 'react-redux'

const FetchMessage = ({loading, errors}) => {
    return (
        <Fragment >
            {/* Conditionally render via && operator acting as if statement */}
            {loading &&
                <div className="text-center">
                    <span className="spinner-border spinner-border-sm text-primary"/>
                    <span className="d-none d-sm-none d-md-inline"> Loading</span>
                </div>
            }
            {/* Conditionally render via && operator acting as if statement */}
            {errors.length > 0 &&
                <div className="text-center">
                    <ul className="list-unstyled text-danger">
                        {errors.map((message, index) => <li key={index}>{message}</li>)}
                    </ul>
                </div>
            }
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.fetchMessage.loading,
        errors: state.fetchMessage.errors
    }
}

export default connect(mapStateToProps)(FetchMessage)