import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import IndexTable from './IndexTable.js'


class Circuit extends Component {

    componentDidMount() {
        this.props.getCircuit(this.props.id)
    }

    render () {
        const circuit = this.props.circuit
        const breweryDataDisplayNames = ['Name', 'Type', 'Tags', 'Rating', 'Likes', 'Reviews', 'Favorited']
        const breweryDataKeys = ['name', 'brewery_type', 'tag_list', 'rating', 'likes_count', 'reviews_count', 'favorites_count']
        const reviewDataDisplayNames = ['Title', 'Author', 'Rating']
        const reviewDataKeys = ['title', 'author_name', 'rating']

        return (
            <Container className="col-11 mt-4 border border-secondary rounded-lg">
                {/* Redirect to logged in user dashboard if they are looking at their own page */}
                {/* {this.props.userId === parseInt(this.props.id) && <Redirect to="/dashboard" />} */}

                <FetchMessage/>

                <CardColumns className="p-4">

                    <Card>
                        <Card.Header>Circuit Information</Card.Header>
                        <Card.Body>
                            <Card.Title>Title: {circuit.title}</Card.Title>
                            <Card.Text>Author: {circuit.author_name}</Card.Text>
                            <Card.Text>Description: {circuit.description }</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Statistics</Card.Header>
                        <Card.Body>
                            <Card.Text>Breweries: {circuit.breweries_count}</Card.Text>
                            <Card.Text>Favorited: {circuit.favorites_count}</Card.Text>
                            <Card.Text>Likes: {circuit.likes_count}</Card.Text>
                            <Card.Text>Reviews: {circuit.reviews_count}</Card.Text>
                            <Card.Text>Rating: {circuit.rating}</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Map</Card.Header>
                        <Card.Body>
                            <Card.Text><span className="spinner-border spinner-border-sm text-primary"/> Google Maps API</Card.Text>
                        </Card.Body>
                    </Card>

                    {!!circuit.breweries &&
                        <Card>
                            <Card.Header>Breweries</Card.Header>
                            <IndexTable data={circuit.breweries} basePath={"/breweries"} dataDisplayNames={breweryDataDisplayNames} dataKeys={breweryDataKeys}/>
                        </Card>
                    }

                    {!!circuit.reviews &&
                        <Card>
                            <Card.Header>Reviews</Card.Header>
                            <IndexTable data={circuit.reviews} basePath={"/reviews"} dataDisplayNames={reviewDataDisplayNames} dataKeys={reviewDataKeys}/>
                        </Card>
                    }

                </CardColumns>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        circuit: state.circuit.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCircuit: (id) => {dispatch(getCircuit(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circuit)