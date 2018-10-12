import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import GOOGLE_API_KEY from '../../../secrets'
import Loader from '../Utils/Loader'
import {Icon} from 'semantic-ui-react'

const CustomMarker = () => <Icon name="flag checkered" size="big" />

class Map extends Component {
  render() {
    const {latitude, longitude} = this.props

    if (latitude)
      return (
        <div style={{height: '50vh', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{key: GOOGLE_API_KEY}}
            initialCenter={{
              lat: latitude,
              lng: longitude
            }}
            center={{
              lat: latitude,
              lng: longitude
            }}
            defaultZoom={15}
          >
            <CustomMarker lat={latitude} lng={longitude} />
          </GoogleMapReact>
        </div>
      )
  }
}
export default Map
