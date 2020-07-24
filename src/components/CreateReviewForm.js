import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FetchMessage from './FetchMessage.js'

class CreateReviewForm extends Component {

    state = {
        title: '',
        content: '',
        rating: 5,
        user_id: this.props.userId,
        // Note that only one of the following ids is accepted by the backend, it ignores the other.
        brewery_id: this.props.subjectId,
        circuit_id: this.props.subjectId
        
    }

    handleTitleChange = event => {
        // 50 is max character length as enforced by backend
        if (event.target.value.length <= 50) {
            this.setState({title: event.target.value})
        }
    }

    handleContentChange = event => {
        // 500 is max character length as enforced by backend
        if (event.target.value.length <= 500) {
            this.setState({content: event.target.value})
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state,this.props)
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        this.props.submitReview(this.state)
    }

    render() {
        return (
            <Card className='mt-4 mx-auto px-0'>
                <Card.Header><i className="far fa-newspaper"/> Create {this.props.formTitle} Review for {this.props.subjectName}</Card.Header>
                <Card.Body as={Form} className="py-3 px-3" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Row>
                        <Form.Group as={Col} className="col-10">
                            <Form.Control type="text" placeholder="Title" name="title" value={this.state.title} onChange={event => this.handleTitleChange(event)}/>
                            {/* 10 is min character length as enforced by backend */}
                            <Form.Text className={this.state.title.length < 10 ? "text-info" : "text-muted"}>Must be between 10 and 50 characters (Character Count: {this.state.title.length})</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} className="col-2">
                            <Form.Control as="select" default="5" name="rating" value={this.state.rating} onChange={event => this.handleChange(event)}>
                                {/* Rating must be 1-5 as enforced by backend */}
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                                <option>0</option>
                            </Form.Control>
                            <Form.Text className="text-muted">Rating</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Control as="textarea" rows="4" placeholder="Write review here..." name="content" value={this.state.content} onChange={event => this.handleContentChange(event)}/>
                        {/* 50 is min character length as enforced by backend */}
                        <Form.Text className={this.state.content.length < 50 ? "text-info" : "text-muted"}>Must be between 50 and 500 characters (Character Count: {this.state.content.length})</Form.Text>
                    </Form.Group>
                    <Form.Group className="float-right">
                        <Button className="mr-2" variant="secondary" type="button" title="Cancel"onClick={() => this.props.toggleForm()} >
                            <i className="far fa-times-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Cancel</span>
                        </Button>
                        <Button variant="primary" type="submit" title="Submit Review">
                            <i className="fas fa-check-circle"/>
                            <span className="d-none d-sm-none d-md-inline"> Submit Review</span>
                        </Button>
                    </Form.Group>
                </Card.Body>
                <FetchMessage/>
            </Card>
        )
    }
}

export default CreateReviewForm