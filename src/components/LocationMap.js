import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

export const LocationMap = ({name, address, latitude, longitude, zoomLevel, google}) => {

    const [showInfo, setShowInfo] = useState(true)
    const [activeMarker, setactiveMarker] = useState()

    const onMarkerClick = (props, marker) => {
        setShowInfo(true)
        setactiveMarker(marker)
    }

    const onCloseClick = () => {
        setShowInfo(false)
        setactiveMarker()
    }

    return (
        <Card style={{minHeight: "50vh", width: "45vw"}}>
            <Map google={google}
            zoom={zoomLevel ? zoomLevel : 15}
            style={{height: "100%", width: "100%"}}
            initialCenter={{lat: parseFloat(latitude), lng: parseFloat(longitude)}}
            >
                <Marker onClick={onMarkerClick}/>
                <InfoWindow marker={activeMarker} visible={showInfo} onClose={onCloseClick} >
                    <h6>{name}</h6>
                    <p>{address}</p>
                </InfoWindow>
            </Map>
        </Card>
    )
}

export default GoogleApiWrapper({apiKey: process.env.REACT_APP_GOOGLE_MAP_API})(LocationMap)