import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, CardDeck, Card, Button} from 'react-bootstrap'
import {getBrewery} from '../actions/brewery.js'
import FetchMessage from './FetchMessage.js'
import CommonNavigationBar from './CommonNavigationBar.js'
import CommonCard from '../containers/CommonCard.js'
import RatingStars from './RatingStars.js'
import FavoriteButton from './FavoriteButton.js'
import LikeButton from './LikeButton.js'
import LocationMap from './LocationMap.js'
import Reviews from '../containers/Reviews.js'

class Brewery extends Component {

    componentDidMount() {
        this.props.getBrewery(this.props.id)
    }

    render () {
        const brewery = this.props.brewery

        return (
            <Container className="col-10 mt-4">

                <FetchMessage/>

                <CardDeck className="mb-4">
                    <Card className="col-5 px-0">
                        <CommonNavigationBar
                            variant="brewery"
                            navSubTitle={": " + brewery.name}
                            showSearch={false}
                        />
                        <Card.Body>
                            <Card.Text>
                                <span className="font-weight-bold">Rating: </span>
                                <RatingStars rating={brewery.rating} />
                                <span className="text-muted"> ({brewery.reviews_count} Reviews)</span>
                                <span className="float-right">
                                    <span className="font-weight-bold">Favorited: </span>
                                    {brewery.favorites_count}
                                    {/* Only render favorite button if user is logged in */}
                                    {this.props.userId && <FavoriteButton variant="brewery" favoriteId={brewery.active_user_favorite_id} userId={this.props.userId} subjectId={brewery.id} />}
                                </span>
                            </Card.Text>
                            <Card.Text>
                                <span className="font-weight-bold">Related Circuits: </span>
                                {brewery.public_circuits_count}
                                <span className="float-right">
                                    <span className="font-weight-bold">Likes: </span>
                                    {brewery.likes_count}
                                    {/* Only render favorite button if user is logged in */}
                                    {this.props.userId && <LikeButton variant="brewery" likeId={brewery.active_user_like_id} userId={this.props.userId} subjectId={brewery.id} />}
                                </span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <span className="font-weight-bold">Phone: </span>
                            {brewery.phone}
                            <Button className="float-right" variant="outline-secondary" size="sm" href={brewery.website_url} >Brewery Website</Button>
                        </Card.Footer>
                    </Card>

                    {/* Only show a map if the latitude and longitude data exists */}
                    {(brewery.latitude && brewery.longitude) &&
                        <LocationMap name={brewery.name} address={brewery.full_address} latitude={brewery.latitude} longitude={brewery.longitude} />
                    }
                </CardDeck>

                <CardDeck className="mb-4">
                    {(brewery.public_circuits && brewery.public_circuits.length > 0) &&
                        <CommonCard variant='circuits' data={brewery.public_circuits} hideDataDefault={true}/>
                    }

                    {brewery.reviews_count >= 0 && 
                        <Reviews variant='brewery-reviews' data={brewery.reviews} userId={this.props.userId} subjectId={brewery.id} subjectName={brewery.name} hideDataDefault={true} showWriteReview={true}/>
                    }
                </CardDeck>

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        brewery: state.brewery.selected,
        userId: state.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrewery: (id) => {dispatch(getBrewery(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brewery)