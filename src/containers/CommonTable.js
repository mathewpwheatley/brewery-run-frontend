import React from 'react'
import Table from 'react-bootstrap/Table'
import CommonTableRow from '../components/CommonTableRow.js'

const CommonTable = ({data, displayKeys, basePath}) => {

    const mapHeadings = () => {
        return Object.values(displayKeys).map((displayName, index) => {
            return (
                <th key={index} >{displayName}</th>
            )
        })
    }

    const mapData = () => {
        return data.map(datum => <CommonTableRow key={datum.id} basePath={basePath} datum={datum} dataKeys={Object.keys(displayKeys)} />)
    }
    
    return (
        <Table className="text-center" hover size="sm">
            <thead className="thead-light">
                <tr>
                    {mapHeadings()}
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {mapData()}
            </tbody>
        </Table>
    )
}

export default CommonTable