import React, {Component} from 'react'
import {Card} from 'react-bootstrap'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

export class CircuitMap extends Component {

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      }

    onMarkerClick = (props, marker, event) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }


    onCloseClick = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    }

    mapWayPoints = () => {
      return this.props.wayPoints.map(wayPoint => {
        return <Marker key={wayPoint.id} position={{lat: parseFloat(wayPoint.latitude), lng: parseFloat(wayPoint.longitude)}} name={wayPoint.name} address={wayPoint.full_address} onClick={this.onMarkerClick} />
      })
    }

    render() {
        return (
            <Card style={{height: "50vh", width: "45vw"}}>
                <Map google={this.props.google}
                zoom={this.props.zoomLevel ? this.props.zoomLevel : 10}
                style={{height: "100%", width: "100%"}}
                initialCenter={{lat: parseFloat(this.props.wayPoints[0].latitude), lng: parseFloat(this.props.wayPoints[0].longitude)}}
                >
                    {this.mapWayPoints()}
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onCloseClick} >
                        <h6>{this.state.selectedPlace.name}</h6>
                        <p>{this.state.selectedPlace.address}</p>
                    </InfoWindow>
                </Map>
            </Card>
        )
    }
}

export default GoogleApiWrapper({apiKey: process.env.REACT_APP_GOOGLE_MAP_API})(CircuitMap)