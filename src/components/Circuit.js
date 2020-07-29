import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Container, CardDeck, Card, Row, Col} from 'react-bootstrap'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from './FetchMessage.js'
import CommonNavigationBar from './CommonNavigationBar.js'
import CommonCard from '../containers/CommonCard.js'
import RatingStars from './RatingStars.js'
import FavoriteButton from './FavoriteButton.js'
import LikeButton from './LikeButton.js'
import CircuitPublicButton from './CircuitPublicButton.js'
import CommonDeleteButton from './CommonDeleteButton.js'
import CircuitMap from './CircuitMap.js'
import BlankMap from './BlankMap.js'
import Reviews from '../containers/Reviews.js'

class Circuit extends Component {

    state={redirectPath: 0}

    componentDidMount() {
        this.props.getCircuit(this.props.id)
    }

    handleRedirect = () => {
        if (!this.props.userId && !this.props.circuit.public) {
            return <Redirect to="/circuits"/> // Redirect, user is not logged in and circuit is private
        } else if (this.props.userId === this.props.circuit.author_id) {
            return // Nothing, user is author of circuit so they can see it
        } else if (!this.props.circuit.public) {
            console.log("third")
            return <Redirect to="/circuits"/> // Redirect, circuit is private and doesnt belong to current user
        }
    }

    render () {
        const circuit = this.props.circuit

        return (
            <Container className="col-10 mt-4">
                
                <FetchMessage/>

                {/* Ensure circuit has been loading before checking for redirect */}
                {circuit.id &&
                    this.handleRedirect()
                }

                <CardDeck className="mb-4">
                    <Card className="col-5 px-0">
                        <CommonNavigationBar
                                variant="circuit"
                                navSubTitle={": " + circuit.title}
                                showSearch={false}
                            />
                        <Card.Body>
                            <Card.Text>
                                <span className="font-weight-bold">Rating: </span>
                                <RatingStars rating={circuit.rating} />
                                <span className="text-muted"> ({circuit.reviews_count} Reviews)</span>
                                <span className="float-right">
                                    <span className="font-weight-bold">Favorited: </span>
                                    {circuit.favorites_count}
                                    {/* Only render favorite button if user is logged in and they are not the owner */}
                                    {(this.props.userId && (this.props.userId !== circuit.author_id)) && 
                                        <FavoriteButton variant="circuit" favoriteId={circuit.active_user_favorite_id} userId={this.props.userId} subjectId={circuit.id} />
                                    }
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Related Breweries: </span>
                                {circuit.breweries_count}
                                <span className="float-right">
                                    <span className="font-weight-bold">Likes: </span>
                                    {circuit.likes_count}
                                    {/* Only render favorite button if user is logged in and they are not the owner */}
                                    {(this.props.userId && (this.props.userId !== circuit.author_id))  && 
                                        <LikeButton variant="circuit" likeId={circuit.active_user_like_id} userId={this.props.userId} subjectId={circuit.id} />
                                    }
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Author: </span>
                                {this.props.userId ? <Link to={"/users/"+ circuit.author_id}>{circuit.author_name}</Link>: circuit.author_name}
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Description: </span>
                                {circuit.description }
                            </Card.Text>
                  
                            {/* Only render delete and public buttons if user is logged in and are the author */}
                            {this.props.userId === circuit.author_id && 
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <CircuitPublicButton circuitId={circuit.id} status={circuit.public} />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <CommonDeleteButton variant="circuit" subjectId={circuit.id}/>
                                </Col>
                            </Row>
                            }
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Created: {new Date(circuit.created_at).toLocaleDateString()}
                            <span className="float-right">Last Updated: {new Date(circuit.updated_at).toLocaleDateString()}</span>
                        </Card.Footer>
                    </Card>
                    {(circuit.breweries && circuit.breweries.length > 0) ?
                        <CircuitMap wayPoints={circuit.breweries} /> :
                        <BlankMap/>
                     }
                </CardDeck>

                <CardDeck className="mb-4">
                    <CommonCard variant='breweries' data={circuit.breweries} hideDataDefault={true}/>
                    <Reviews
                    variant='circuit-reviews'
                    data={circuit.reviews}
                    userId={this.props.userId}
                    subjectId={circuit.id}
                    subjectName={circuit.title}
                    hideDataDefault={true}
                    // Can only write a review if logged in and user is not the circuit authro
                    showWriteReview={this.props.userId && (this.props.userId !== circuit.author_id)}/>
                </CardDeck>

            </Container>
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