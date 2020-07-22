import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import IndexTableRow from '../components/IndexTableRow.js'

class IndexTable extends Component {

    mapHeadings = () => {
        return this.props.dataDisplayNames.map((dataDisplayName, index) => {
            return (
                <th key={index} >{dataDisplayName}</th>
            )
        })
    }

    mapData = () => {
        return this.props.data.map(datum => <IndexTableRow key={datum.id} basePath={this.props.basePath} datum={datum} dataKeys={this.props.dataKeys} />)
    }
    
    render () {
        return (
            <Table className="text-center" hover size="sm">
                <thead className="thead-light">
                    <tr>
                        {this.mapHeadings()}
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapData()}
                </tbody>
            </Table>
        )
    }
}

export default IndexTable