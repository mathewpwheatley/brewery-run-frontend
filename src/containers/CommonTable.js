import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'
import CommonTableRow from '../components/CommonTableRow.js'

const CommonTable = ({data, displayKeys, basePath, showLink}) => {

    const [sortKey, setSortKey] = useState(Object.keys(displayKeys)[0])
    const [sortOrder, setSortOrder] = useState(1)
    const [sortOrderIcon, setSortOrderIcon] =useState(<i className="fas fa-sort-up"/>)

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
        return Object.keys(displayKeys).map((displayKey, index) => {
            return (
                <th key={index} onClick={() => setSort(displayKey)}>{displayKeys[displayKey]} { sortKey === displayKey ? sortOrderIcon : <i className="fas fa-sort"/>}</th>
            )
        })
    }

    const sortData = () => {
        return data.sort(function(a, b){return sortOrder*(b[sortKey]-a[sortKey])})
    }
    
    const mapData = () => {
        return sortData().map(datum => <CommonTableRow key={datum.id} basePath={basePath} datum={datum} dataKeys={Object.keys(displayKeys)} showLink={showLink} />)
    }
    
    return (
        <Table className="text-center" hover size="sm">
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