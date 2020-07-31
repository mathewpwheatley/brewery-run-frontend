import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

const  Footer = () => {
    return (
        <Navbar className="footer" bg="light">
            <Nav.Item className="text-secondary mx-auto">
                Created by Mathew Wheatley
                <span> </span>
                <a className="text-danger" href="https://github.com/mathewpwheatley" title="Github" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"/>
                </a>
                <span> </span>
                <a className="text-danger" href="https://www.linkedin.com/in/mathewpwheatley" title="Linkedin" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin" />
                </a>
                <span> </span>
                <a className="text-danger" href="https://medium.com/@mathew.p.wheatley" title="Medium" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-medium" />
                </a>
                <span> </span>
                <a className="text-danger" href="https://www.instagram.com/mathew.p.wheatley/" title="Instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram" />
                </a>
            </Nav.Item>
        </Navbar>
    )
}

export default Footer