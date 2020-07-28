import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import Review from './Review.js'

const Reviews = ({variant, data, userId, navSubTitle, hideDataDefault, hideSearch}) => {

    const [showData, setShowData] = useState(hideDataDefault ? false : true)
    const [searchTerm, setSearchTerm] = useState()

    const toggleData = () => {
        showData ? setShowData(false) : setShowData(true)
    }

    const updateSearchTerm = (searchTerm) => setSearchTerm(searchTerm)

    const filterDataByName = () => {
        if (searchTerm) {
            const searchTermKey = "title"
            return data.filter(datum => datum[searchTermKey].toLowerCase().includes(searchTerm.toLowerCase()))
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
                showData={showData}
                showSearch={hideSearch ? false : true}
                toggleData={toggleData}
                searchName={"Title"}
                searchTerm={searchTerm}
                updateSearchTerm={updateSearchTerm}
            />
            {showData &&
                mapData()
            }
        </Card>
    )
}

export default Reviews