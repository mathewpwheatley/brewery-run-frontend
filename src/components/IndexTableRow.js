import React from 'react'
import Button from 'react-bootstrap/Button'

const IndexTableRow = ({datum, columns}) => {

    const mapColumns = () => {
        return columns.map((column, index) => {
            if (column === 'website_url') {
                return <td key={index}><Button size="sm" variant="outline-secondary" href={datum[column]} target="_blank" rel="noopener noreferrer" >External</Button></td>
            } else {
                return <td key={index}>{datum[column]}</td>
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