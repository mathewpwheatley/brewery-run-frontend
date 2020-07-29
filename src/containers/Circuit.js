import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, CardDeck, Card, Row, Col} from 'react-bootstrap'
import {getCircuit} from '../actions/circuit.js'
import FetchMessage from '../components/FetchMessage.js'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import CommonCard from './CommonCard.js'
import RatingStars from '../components/RatingStars.js'
import FavoriteButton from '../components/FavoriteButton.js'
import LikeButton from '../components/LikeButton.js'
import CircuitPublicButton from '../components/CircuitPublicButton.js'
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
            <Container className="col-10 mt-4">
                
                <FetchMessage/>

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
                                    {/* Only render favorite button if user is logged in */}
                                    {this.props.userId && <FavoriteButton variant="circuit" favoriteId={circuit.active_user_favorite_id} userId={this.props.userId} subjectId={circuit.id} />}
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Related Breweries: </span>
                                {circuit.breweries_count}
                                <span className="float-right">
                                    <span className="font-weight-bold">Likes: </span>
                                    {circuit.likes_count}
                                    {/* Only render favorite button if user is logged in */}
                                    {this.props.userId && <LikeButton variant="circuit" likeId={circuit.active_user_like_id} userId={this.props.userId} subjectId={circuit.id} />}
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
                    
                    {(circuit.breweries && circuit.breweries.length > 0) &&
                        <CircuitMap breweries={circuit.breweries} />
                        
                    }
                </CardDeck>

                <CardDeck className="mb-4">
                    {(circuit.breweries && circuit.breweries.length > 0) &&
                        <CommonCard variant='breweries' data={circuit.breweries} hideDataDefault={true}/>
                    }

                    {circuit.reviews_count >= 0 && 
                        <Reviews variant='circuit-reviews' data={circuit.reviews} userId={this.props.userId} subjectId={circuit.id} subjectName={circuit.title} hideDataDefault={true} showWriteReview={true}/>
                    }
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