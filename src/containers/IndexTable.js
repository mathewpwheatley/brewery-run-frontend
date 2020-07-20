import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import IndexTableRow from '../components/IndexTableRow.js'

class IndexTable extends Component {

    mapHeadings = () => {
        return this.props.headings.map((heading, index) => {
            return (
                <th key={index} >{heading}</th>
            )
        })
    }

    mapData = () => {
        return this.props.data.map(datum => <IndexTableRow key={datum.id} datum={datum} columns={this.props.columns} />)
    }

    // handleClick = event => {
    //     let sort_by
    //     if (event.currentTarget.value === "ascending") {
    //         sort_by = "descending"
    //     } else {
    //         sort_by = "ascending"
    //     }
    //     this.setState({
    //         current: event.currentTarget.name,
    //         [event.currentTarget.name]: sort_by
    //     })
    // }

    
    render () {
        return (
            <Table className="text-center" hover size="sm">
                <thead className="thead-light">
                    <tr>
                        {this.mapHeadings()}
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