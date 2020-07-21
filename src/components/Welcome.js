import React from 'react'
import {Link} from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Welcome = () => {

    return (
        
        <Container className="col-4 mt-4">
            <Jumbotron className="text-center py-5 border border-secondary">
                <h1 lassName="display-4"><i className="fas fa-beer"/> Welcome to Beer Run</h1>
                <p className="lead"> Bringing the fun back to your run!</p>
                <hr className="my-4"/>
                <p>Join the Community</p>
                <Link exact to="/create-account" title="Create Account">
                    <Button  className="mx-3" variant="primary">
                        <i className="fas fa-user-plus"/>
                        <span className="d-none d-sm-none d-md-inline"> Create Account</span>
                    </Button>
                </Link>
                <Link exact to="/circuits" title="View Circuits">
                    <Button  className="mx-3" variant="secondary">
                        <i className="fas fa-route"/>
                        <span className="d-none d-sm-none d-md-inline"> View Circuits</span>
                    </Button>
                </Link>
                <p className='text-muted mt-4 mb-0'>
                    Created by Mathew Wheatley <a className="text-muted" href="https://github.com/mathewpwheatley" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"/></a> <a className="text-muted" href="https://www.linkedin.com/in/mathewpwheatley" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                </p>
            </Jumbotron>
        </Container>
    )
}

export default Welcome