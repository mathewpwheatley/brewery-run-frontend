import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonNavigation from './CommonNavigation.js'
import CreateReview from './CreateReview.js'
import FavoriteButton from '../components/FavoriteButton.js'
import LikeButton from '../components/LikeButton.js'
import DeleteCircuitButton from '../components/DeleteCircuitButton.js'

class Circuit extends Component {

    componentDidMount() {
        this.props.getCircuit(this.props.id)
    }

    render () {
        const circuit = this.props.circuit

        return (
            <CardColumns className="p-4">
                
                <FetchMessage/>

                <Card>
                    <Card.Header>Circuit Information</Card.Header>
                    <Card.Body>
                        <Card.Title>Title: {circuit.title}</Card.Title>
                        <Card.Text>Author: {this.props.userId ? <Link to={"/users/"+ circuit.author_id}>{circuit.author_name}</Link>: circuit.author_name}</Card.Text>
                        <Card.Text>Description: {circuit.description }</Card.Text>
                        {!!this.props.userId &&
                            <Fragment>
                                <FavoriteButton variant="circuit" favoriteId={circuit.active_user_favorite_id} userId={this.props.userId} subjectId={circuit.id} />
                                <LikeButton variant="circuit" likeId={circuit.active_user_like_id} userId={this.props.userId} subjectId={circuit.id} />
                            </Fragment>
                        }
                        <DeleteCircuitButton circuitId={this.props.circuit.id}/>
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

                {(!!circuit.breweries && circuit.breweries.length > 0) &&
                    <CommonNavigation variant='breweries' data={circuit.breweries} />
                }

                {(!!circuit.reviews && circuit.reviews.length > 0) &&
                    <CommonNavigation variant='circuit-reviews' data={circuit.reviews} />
                }

                <CreateReview variant='circuit-review' subjectId={circuit.id} subjectName={circuit.title}/>

            </CardColumns>
        )
    }
}

const mapStateToProps = state => {
    return {
        circuit: state.circuit.selected,
        userId: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCircuit: (id) => {dispatch(getCircuit(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circuit)