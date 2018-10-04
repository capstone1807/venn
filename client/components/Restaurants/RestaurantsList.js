import React, {Component, Fragment} from 'react'
import RestaurantsEmpty from './RestaurantsEmpty'
import {Container} from 'semantic-ui-react'

class Restaurants extends Component {
  state = {}
  componentDidMount() {
    // fetchFromPropsFromMapDispatchThunk
  }

  render() {
    console.log('render')
    const {restaurants} = this.props
    return !restaurants ? (
      <RestaurantsEmpty />
    ) : (
      <Container text>List Restaurants Here </Container>
    )
  }
}

// connect

export default Restaurants
