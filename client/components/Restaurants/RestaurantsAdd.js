import React, {Component, Fragment} from 'react'
import PlacesAutoComplete from './PlacesAutoComplete'
import {Header} from 'semantic-ui-react'

class RestaurantsAdd extends Component {
  render() {
    return (
      <Fragment>
        <Header>Search Restaurants</Header>
        <PlacesAutoComplete />
      </Fragment>
    )
  }
}

export default RestaurantsAdd
