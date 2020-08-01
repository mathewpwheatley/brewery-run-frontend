import React from 'react'
import {Link} from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const Welcome = () => {

    return (
        <Jumbotron className="col-6 mt-4 mx-auto p-3 text-center bg-white">
            <h1 className="display-4 text-primary"><i className="fas fa-beer" style={{color: "#ffbe32"}} /> Welcome to Brewery Run</h1>
            <p className="lead text-secondary"> Bringing the fun back to your run!</p>
            <div>
                <img style={{width: "35vw"}}alt="Running in Park" src={process.env.PUBLIC_URL + '/running_park.png'} />
            </div>
            <div>
                <Link to="/breweries" title="View Breweries">
                    <Button  className="mx-3" variant="info" size="sm" >
                        <i className="fas fa-industry"/>
                        <span className="d-none d-sm-none d-md-inline"> View Breweries</span>
                    </Button>
                </Link>
                <Link to="/create-user" title="Create Accout">
                    <Button  className="mx-3" variant="success" >
                        <i className="fas fa-user-plus"/>
                        <span className="d-none d-sm-none d-md-inline"> Create Accout</span>
                    </Button>
                </Link>
                <Link to="/circuits" title="View Circuits">
                    <Button  className="mx-3" variant="info" size="sm" >
                        <i className="fas fa-route"/>
                        <span className="d-none d-sm-none d-md-inline"> View Circuits</span>
                    </Button>
                </Link>
            </div>
        </Jumbotron>
    )
}

export default Welcome