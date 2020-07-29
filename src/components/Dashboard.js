import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {Container, CardDeck, Card, Button, Row, Col} from 'react-bootstrap'
import {getUser} from '../actions/user.js'
import FetchMessage from './FetchMessage.js'
import CommonNavigationBar from './CommonNavigationBar.js'
import CommonCard from '../containers/CommonCard.js'
import Reviews from '../containers/Reviews.js'
import CreateCircuit from '../containers/CreateCircuit.js'
import RatingStars from './RatingStars.js'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getUser(this.props.userId)
    }

    render () {
        const user = this.props.user

        return (
            <Container className="col-10 mt-4">

                {/* Redirect to root if user is not logged in */}
                {!this.props.userId && <Redirect to="/" />}

                <FetchMessage/>

                <CardDeck className="mb-4">
                    <Card className="px-0">
                        <CommonNavigationBar
                            variant="user"
                            navSubTitle={": " + user.full_name}
                            showSearch={false}
                        />
                        <Card.Body>
                            
                            <Card.Text>
                                <span className="font-weight-bold">Public Circuits Average Rating: </span>
                                <RatingStars rating={user.public_circuits_avg_rating} />
                                <span className="text-muted"> ({user.public_circuits_count} Circuits)</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Private Circuits Average Rating: </span>
                                <RatingStars rating={user.private_circuits_avg_rating} /> 
                                <span className="text-muted"> ({user.private_circuits_count} Circuits)</span>
                            </Card.Text>
                            <Row as={Card.Text}>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Favorited Circuits: </span>
                                        {user.favorite_circuits_count}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Circuit Reviews Written: </span>
                                        {user.circuit_reviews_count}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row as={Card.Text}>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Favorited Breweries: </span>
                                        {user.favorite_breweries_count}
                                    </Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        <span className="font-weight-bold">Brewery Reviews Written: </span>
                                        {user.brewery_reviews_count}
                                    </Card.Text>
                                </Col>
                                
                            </Row>
                            <Card.Text>
                                <span className="font-weight-bold">Email: </span>
                                {user.email}
                                <Link className="float-right" to="/edit-user">
                                    <Button size="sm" variant="outline-secondary" type="button" title="Edit User">
                                        <i className="fas fa-user-edit"/>
                                        <span className="d-none d-sm-none d-md-inline"> Edit Account</span>
                                    </Button>
                                </Link>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Address: </span>
                                {user.full_address}
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">About: </span>
                                {user.about}
                            </Card.Text>
                            <Card.Text className="float-right">
                                <CreateCircuit/>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Member Since: {new Date(user.created_at).toLocaleDateString()}
                            <span className="float-right">Following: {user.following_count}, Followers: {user.followers_count}</span>
                        </Card.Footer>
                    </Card>

                    <CommonCard variant='breweries' navSubTitle=': Favorited' data={user.favorite_breweries} hideDataDefault={true}/> 
                </CardDeck>

                <CardDeck className="mb-4">
                    <CommonCard variant='circuits' navSubTitle=' from Followees' data={user.public_followees_circuits}  hideDataDefault={true}/>
                    <CommonCard variant='circuits' navSubTitle=': Favorited' data={user.favorite_circuits}  hideDataDefault={true}/>
                </CardDeck>

                <CardDeck className="mb-4">
                    <CommonCard variant='circuits' navSubTitle=': Private' hideTableDefault={true} data={user.private_circuits} hideDataDefault={true}/>
                    <CommonCard variant='circuits' navSubTitle=': Public' hideTableDefault={true} data={user.public_circuits} hideDataDefault={true}/>
                </CardDeck>

                <CardDeck className="mb-4">
                    <Reviews variant='brewery-reviews' navSubTitle=': Breweries' data={user.brewery_reviews} userId={this.props.userId} hideDataDefault={true}/>
                    <Reviews variant='circuit-reviews' navSubTitle=': Circuits' data={user.circuit_reviews} userId={this.props.userId} hideDataDefault={true}/>
                </CardDeck>
                
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        user: state.user.selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (userId) => {dispatch(getUser(userId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

