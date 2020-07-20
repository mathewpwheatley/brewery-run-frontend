import React from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import IndexGridCard from '../components/IndexGridCard.js'

const IndexGrid = ({data, dataDisplayNames, dataKeys}) => {

    return (
        <CardColumns className="p-4">
            {data.map(datum => <IndexGridCard key={datum.id} datum={datum} dataDisplayNames={dataDisplayNames} dataKeys={dataKeys}/>)}
        </CardColumns>
    )
}

export default IndexGrid