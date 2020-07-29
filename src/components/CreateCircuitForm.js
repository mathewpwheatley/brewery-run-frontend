import React, {Component} from 'react'
import {Modal, Form, Col, Button} from 'react-bootstrap'
import FetchMessage from './FetchMessage.js'

class CreateReviewForm extends Component {

    state = {
        title: '',
        description: '',
        public: false,
        user_id: this.props.userId,
        brewery_ids: []
    }

    handleTitleChange = event => {
        // 50 is max character length as enforced by backend
        if (event.target.value.length <= 50) {
            this.setState({title: event.target.value})
        }
    }

    handleDescriptionChange = event => {
        // 500 is max character length as enforced by backend
        if (event.target.value.length <= 200) {
            this.setState({description: event.target.value})
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        await this.props.submitCircuit(this.state)
        // If there are no errors from the fetch, close form
        if (this.props.errors.length === 0) {this.props.toggleForm()}
    }

    render() {
        return (
            <Modal size="lg" show={true} onHide={this.props.toggleForm} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fas fa-route"/>
                        <span className="d-none d-sm-none d-md-inline"> Create Circuit</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body as={Form} className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} className="col-10">
                            <Form.Control type="text" placeholder="Title" name="title" value={this.state.title} onChange={event => this.handleTitleChange(event)}/>
                            {/* 10 is min character length as enforced by backend */}
                            <Form.Text className={this.state.title.length < 10 ? "text-info" : "text-muted"}>Must be between 10 and 50 characters (Character Count: {this.state.title.length})</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} className="col-2">
                            <Form.Control as="select" default="Private" name="public" value={this.state.public} onChange={event => this.handleChange(event)}>
                                <option value="false">Private</option>
                                <option value="true">Public</option>
                            </Form.Control>
                            <Form.Text className="text-muted">Public</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Control as="textarea" rows="2" placeholder="Circuit descriptions..." name="description" value={this.state.description} onChange={event => this.handleDescriptionChange(event)}/>
                        {/* 50 is min character length as enforced by backend */}
                        <Form.Text className={this.state.description.length < 25 ? "text-info" : "text-muted"}>Must be between 25 and 200 characters (Character Count: {this.state.description.length})</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Breweries</Form.Label>
                        <Form.Control as="select" multiple>
                            <option value="1">1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="float-right">
                        <Button className="mr-2" variant="secondary" type="button" title="Cancel"onClick={() => this.props.toggleForm()} >
                            <i className="far fa-times-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Cancel</span>
                        </Button>
                        <Button variant="primary" type="submit" title="Submit Review">
                            <i className="fas fa-check-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Create Circuit</span>
                        </Button>
                    </Form.Group>
                </Modal.Body>
                <FetchMessage/>
            </Modal>
        )
    }
}

export default CreateReviewForm