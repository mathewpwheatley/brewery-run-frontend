import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'
import CommonTableRow from './CommonTableRow.js'

const CommonTable = ({variant, data, showLink}) => {

    const [sortKey, setSortKey] = useState()
    const [sortOrder, setSortOrder] = useState(1)
    const [sortOrderIcon, setSortOrderIcon] =useState(<i className="fas fa-sort-up"/>)

    let attributes
    const setAttributes = () => {
        switch (variant) {
            case "breweries":
                attributes = {
                    basePath: '/breweries',
                    displayKeys: {name: 'Name', brewery_type: 'Type', public_circuits_count: 'Circuits', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorited'}
                }
                break 
            case "circuits":
                attributes = {
                    basePath: '/circuits',
                    displayKeys: {title: 'Title', distance: 'Distance (mi)', elevation: 'Elevation (ft)', breweries_count: 'Breweries', rating: 'Rating', likes_count: 'Likes', reviews_count: 'Reviews', favorites_count: 'Favorites'}
                }
                break 
            case "users":
                attributes = {
                    basePath: '/users',
                    displayKeys: {full_name: 'Name', public_circuits_avg_rating: 'Circuits Rating', public_circuits_count: 'Circuits', followers_count: 'Followers'}
                }
                break
            default:
                break
        }
    }

    const setSort = (newSortKey) => {
        // Set new sort key
        if (sortKey !== newSortKey) {setSortKey(newSortKey)}
        // Swap new sort order if same sort key clicked (1 = ascending, -1 = descending)
        else {
            if (sortOrder > 0) {
                setSortOrder(-1)
                setSortOrderIcon(<i className="fas fa-sort-down"/>)
            }
            else {
                setSortOrder(1)
                setSortOrderIcon(<i className="fas fa-sort-up"/>)
            }
        }
    }

    const mapHeadings = () => {
        return Object.keys(attributes.displayKeys).map((displayKey, index) => {
            return (
                <th key={index} onClick={() => setSort(displayKey)}>
                    {attributes.displayKeys[displayKey]} { sortKey === displayKey ? sortOrderIcon : <i className="fas fa-sort"/>}
                </th>
            )
        })
    }

    const sortData = () => {
        return data.sort(function(a, b){return sortOrder*(b[sortKey]-a[sortKey])})
    }
    
    const mapData = () => {
        return sortData().map(datum => <CommonTableRow key={datum.id} basePath={attributes.basePath} datum={datum} dataKeys={Object.keys(attributes.displayKeys)} showLink={showLink} />)
    }
    
    return (
        <Table className="text-center" size="sm" hover>
            {setAttributes()}
            <thead className="thead-light">
                <tr>
                    {mapHeadings()}
                    {showLink &&
                        <th>Link</th>
                    }
                </tr>
            </thead>
            <tbody>
                {mapData()}
            </tbody>
        </Table>
    )
}

export default CommonTable