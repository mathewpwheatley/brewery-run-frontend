import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import CommonTable from '../components/CommonTable.js'

const CommonCard = ({variant, data, navSubTitle, hideDataDefault, hideSearch, hideLink}) => {

    const [showData, setShowData] = useState(hideDataDefault ? false : true)
    const [searchTerm, setSearchTerm] = useState()

    const toggleData = () => {
        showData ? setShowData(false) : setShowData(true)
    }

    const updateSearchTerm = (searchTerm) => setSearchTerm(searchTerm)

    const filterDataByName = () => {
        if (searchTerm) {
            const searchTermKey = Object.keys(attributes.displayKeys)[0]
            return data.filter(datum => datum[searchTermKey].toLowerCase().includes(searchTerm.toLowerCase()))
        } else {
            return data
        }
    }

    let attributes
    const setAttributes = () => {
        const subTitle = navSubTitle ? navSubTitle : ''
        switch (variant) {
            case "breweries":
                attributes = {
                    navTitle: 'Breweries' + subTitle,
                    navColor: 'warning',
                    icon: <i className="fas fa-industry"/>,
                    basePath: '/breweries',
                    displayKeys: {name: 'Name', brewery_type: 'Type', public_circuits_count: 'Circuits', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorited'}
                }
                break 
            case "circuits":
                attributes = {
                    navTitle: 'Circuits' + subTitle,
                    navColor: 'success',
                    icon: <i className="fas fa-route"/>,
                    basePath: '/circuits',
                    displayKeys: {title: 'Title', breweries_count: 'Breweries', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
                }
                break 
            case "users":
                attributes = {
                    navTitle: 'Runners' + subTitle,
                    navColor: 'info',
                    icon: <i className="fas fa-running"/>,
                    basePath: '/users',
                    displayKeys: {full_name: 'Name', public_circuits_count: 'Circuits', followers_count: 'Followers'}
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
                showData={showData}
                showSearch={hideSearch ? false : true}
                toggleData={toggleData}
                searchName={Object.values(attributes.displayKeys)[0]}
                searchTerm={searchTerm}
                updateSearchTerm={updateSearchTerm}
            />
            {showData &&
                <CommonTable
                    data={filterDataByName()}
                    displayKeys={attributes.displayKeys}
                    basePath={attributes.basePath}
                    showLink={hideLink ? false : true}
                />
            }
        </Card>
    )
}

export default CommonCard