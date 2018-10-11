import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../../secrets'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    console.log('FINAL', this.props.latitude)
    const lat = this.props.latitude
    const long = this.props.longitude
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={lat}
            lng={long}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default (Map)
