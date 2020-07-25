import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
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

    handleSubmit = event => {
        event.preventDefault()
        this.props.submitCircuit(this.state)
    }

    render() {
        return (
            <Card className='px-0'>
                <Card.Header><i className="fas fa-route"/>
                    <span className="d-none d-sm-none d-md-inline"> Create Circuit</span>
                </Card.Header>
                <Card.Body as={Form} className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} className="col-10">
                            <Form.Control type="text" placeholder="Title" name="title" value={this.state.title} onChange={event => this.handleTitleChange(event)}/>
                            {/* 10 is min character length as enforced by backend */}
                            <Form.Text className={this.state.title.length < 10 ? "text-info" : "text-muted"}>Must be between 10 and 50 characters (Character Count: {this.state.title.length})</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} className="col-2">
                            <Form.Control as="select" default="false" name="public" value={this.state.public} onChange={event => this.handleChange(event)}>
                                {/* Rating must be 1-5 as enforced by backend */}
                                <option>false</option>
                                <option>true</option>
                            </Form.Control>
                            <Form.Text className="text-muted">Public</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Control as="textarea" rows="2" placeholder="Circuit descriptions..." name="description" value={this.state.description} onChange={event => this.handleDescriptionChange(event)}/>
                        {/* 50 is min character length as enforced by backend */}
                        <Form.Text className={this.state.description.length < 25 ? "text-info" : "text-muted"}>Must be between 25 and 200 characters (Character Count: {this.state.description.length})</Form.Text>
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
                </Card.Body>
                <FetchMessage/>
            </Card>
        )
    }
}

export default CreateReviewForm