import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import Review from './Review.js'

const Reviews = ({variant, reviews, userId, navSubTitle, hideReviewsDefault, hideSearch, hideLink}) => {

    const [showReviews, setShowReviews] = useState(hideReviewsDefault ? false : true)
    const [searchTerm, setSearchTerm] = useState()

    const toggleReviews = () => {
        showReviews ? setShowReviews(false) : setShowReviews(true)
    }

    const updateSearchTerm = (searchTerm) => setSearchTerm(searchTerm)

    const filterReviewsByName = () => {
        if (searchTerm) {
            const searchTermKey = Object.keys(attributes.displayKeys)[0]
            return reviews.filter(datum => datum[searchTermKey].toLowerCase().includes(searchTerm.toLowerCase()))
        } else {
            return reviews
        }
    }

    const mapReviews = () => {
        return reviews.map(review => {
            return <Review review={review} variant={variant} userId={userId}/> 
        })
    }

    let attributes
    const setAttributes = () => {
        const subTitle = navSubTitle ? navSubTitle : ''
        switch (variant) {
            case "brewery-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    basePath: '/breweries/reviews',
                    displayKeys: {title: 'Title', author_name: 'Author', rating: 'Rating'}
                }
                break
            case "circuit-reviews":
                attributes = {
                    navTitle: 'Reviews' + subTitle,
                    navColor: 'secondary',
                    icon: <i className="far fa-newspaper"/>,
                    basePath: '/circuits/reviews',
                    displayKeys: {title: 'Title', author_name: 'Author', rating: 'Rating'}
                }
                break
            default:
                break
        }
    }

    return (
        <Card className="px-0 mx-auto">
            {setAttributes()}
            <CommonNavigationBar
                navTitle={attributes.navTitle}
                navColor={attributes.navColor}
                icon={attributes.icon}
                showData={showReviews}
                showSearch={hideSearch ? false : true}
                toggleData={toggleReviews}
                searchName={Object.values(attributes.displayKeys)[0]}
                searchTerm={searchTerm}
                updateSearchTerm={updateSearchTerm}
            />
            {showReviews &&
                // <CommonTable
                //     data={filterDataByName()}
                //     displayKeys={attributes.displayKeys}
                //     basePath={attributes.basePath}
                //     showLink={hideLink ? false : true}
                // />
                mapReviews()
            }
        </Card>
    )
}

export default Reviews