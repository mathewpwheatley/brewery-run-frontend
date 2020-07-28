import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CardDeck, Card} from 'react-bootstrap'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonCard from './CommonCard.js'
import CreateReview from './CreateReview.js'
import FavoriteButton from '../components/FavoriteButton.js'
import LikeButton from '../components/LikeButton.js'
import CommonDeleteButton from '../components/CommonDeleteButton.js'
import CircuitMap from '../components/CircuitMap.js'
import Reviews from './Reviews.js'

class Circuit extends Component {

    componentDidMount() {
        this.props.getCircuit(this.props.id)
    }

    render () {
        const circuit = this.props.circuit

        return (
            <div className="col-10 my-4 mx-auto">
                
                <FetchMessage/>

                <CardDeck>
                    <Card>
                        <Card.Header>Circuit Information</Card.Header>
                        <Card.Body>
                            <Card.Title>Title: {circuit.title}</Card.Title>
                            <Card.Text>Author: {this.props.userId ? <Link to={"/users/"+ circuit.author_id}>{circuit.author_name}</Link>: circuit.author_name}</Card.Text>
                            <Card.Text>Description: {circuit.description }</Card.Text>
                            {/* Only render like/favorite buttons if user is logged in and not viewing their own circuit */}
                            {(this.props.userId && (this.props.userId !== circuit.author_id)) &&
                                <Fragment>
                                    <FavoriteButton variant="circuit" favoriteId={circuit.active_user_favorite_id} userId={this.props.userId} subjectId={circuit.id} />
                                    <LikeButton variant="circuit" likeId={circuit.active_user_like_id} userId={this.props.userId} subjectId={circuit.id} />
                                </Fragment>
                            }
                            {/* Only render delete button if user is logged in and are the author */}
                            {this.props.userId === circuit.author_id && 
                                <CommonDeleteButton variant="circuit" subjectId={circuit.id}/>
                            }
                        </Card.Body>
                    </Card>
                    
                    {(circuit.breweries && circuit.breweries.length > 0) &&
                        <CircuitMap breweries={circuit.breweries} />
                        
                    }
                </CardDeck>

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

                {(circuit.breweries && circuit.breweries.length > 0) &&
                    <CommonCard variant='breweries' data={circuit.breweries} />
                }

                {/* Only logged in users can write a review */}
                {this.props.userId &&
                    <CreateReview variant='circuit-review' subjectId={circuit.id} subjectName={circuit.title}/>
                }

                {circuit.reviews_count > 0 && 
                    <Reviews variant='circuit-reviews' data={circuit.reviews} userId={this.props.userId} hideDataDefault={true}/>
                }

            </div>
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