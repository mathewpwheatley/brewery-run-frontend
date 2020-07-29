import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import Review from '../components/Review.js'

const Reviews = ({variant, data, userId, subjectId, subjectName, navSubTitle, showWriteReview, hideDataDefault, hideSearch}) => {

    const [showData, setShowData] = useState(hideDataDefault ? false : true)
    const [searchTerm, setSearchTerm] = useState()
    const [searchKey, setSearchKey] = useState()

    const updateSearchTerm = (value) => {setSearchTerm(value)}
    const updateSearchKey = (value) => {setSearchKey(value)}

    const toggleData = () => {
        showData ? setShowData(false) : setShowData(true)
    }

    const filterDataByName = () => {
        if (searchTerm) {
            return data.filter(datum => datum[searchKey].toLowerCase().includes(searchTerm.toLowerCase()))
        } else {
            return data
        }
    }

    const mapData = () => {
        return filterDataByName().map(datum => {
            return <Review review={datum} variant={variant} userId={userId}/> 
        })
    }

    return (
        <Card>
            <CommonNavigationBar
                variant={variant}
                navSubTitle={navSubTitle}
                userId={userId}
                subjectId={subjectId}
                subjectName={subjectName}
                showData={showData}
                showSearch={hideSearch ? false : true}
                showWriteReview={showWriteReview}
                toggleData={toggleData}
                searchTerm={searchTerm}
                updateSearchTerm={updateSearchTerm}
                updateSearchKey={updateSearchKey}
            />
            {showData &&
                mapData()
            }
        </Card>
    )
}

export default Reviews