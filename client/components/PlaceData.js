import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import GOOGLE_API_KEY from '../../secrets'

class PlaceData extends Component {
  async componentDidMount() {
    initialize()
  }
  render() {
    return (
      <div>
        <h3>Place Data</h3>
      </div>
    )
  }
}

export default PlaceData

PlaceData.propTypes = {
  //email: PropTypes.string
}
