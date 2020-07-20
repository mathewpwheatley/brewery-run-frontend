import React from 'react'
import Button from 'react-bootstrap/Button'

const IndexTableRow = ({datum, dataKeys}) => {

    const mapColumns = () => {
        return dataKeys.map((dataKey, index) => {
            if (dataKey === 'website_url') {
                return <td key={index}><Button size="sm" variant="outline-secondary" href={datum[dataKey]} target="_blank" rel="noopener noreferrer" >External</Button></td>
            } else {
                return <td key={index}>{datum[dataKey]}</td>
            }
        })
    }

    return (
        <tr>
            {mapColumns()}
        </tr>
    )
}

export default IndexTableRow