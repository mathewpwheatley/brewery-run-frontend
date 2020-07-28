import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import CommonNavigationBar from '../components/CommonNavigationBar.js'
import CommonTable from '../components/CommonTable.js'

const CommonCard = ({variant, data, navSubTitle, hideDataDefault, hideSearch, hideLink}) => {

    const [showData, setShowData] = useState(hideDataDefault ? false : true)
    const [searchTerm, setSearchTerm] = useState()
    const [searchKey, setSearchKey] = useState()

    const toggleData = () => {
        showData ? setShowData(false) : setShowData(true)
    }

    const updateSearchTerm = (value) => {setSearchTerm(value)}
    const updateSearchKey = (value) => {setSearchKey(value)}

    const filterDataByName = () => {
        if (searchTerm) {
            return data.filter(datum => datum[searchKey].toLowerCase().includes(searchTerm.toLowerCase()))
        } else {
            return data
        }
    }
   
    return (
        <Card>
            <CommonNavigationBar
                variant={variant}
                navSubTitle={navSubTitle}
                showData={showData}
                showSearch={hideSearch ? false : true}
                toggleData={toggleData}
                searchTerm={searchTerm}
                updateSearchTerm={updateSearchTerm}
                updateSearchKey={updateSearchKey}
            />
            {showData &&
                <CommonTable
                    variant={variant}
                    data={filterDataByName()}
                    showLink={hideLink ? false : true}
                />
            }
        </Card>
    )
}

export default CommonCard