import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import GOOGLE_API_KEY from '../../../secrets'
import Loader from '../Utils/Loader'
import {Icon, Container, Label} from 'semantic-ui-react'

class Map extends Component {
  //  static defaultProps = {
  //   center: {
  //     lat: this.props.latitude,
  //     lng: this.props.longitude
  //   },
  //   zoom: 11
  // };
  render() {
    const {latitude, longitude} = this.props
    console.log(latitude, longitude)

    return (
      <div style={{height: '50vh', width: '100%'}}>
        {latitude ? (
          <GoogleMapReact
            bootstrapURLKeys={{key: GOOGLE_API_KEY}}
            initialCenter={{
              lat: latitude,
              lng: longitude
            }}
            center={[latitude, longitude]}
            defaultZoom={14}
          />
        ) : (
          <Loader />
        )}
      </div>
    )
  }
}
export default Map
