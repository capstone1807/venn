import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../../store'
import RestaurantsEmpty from './RestaurantsEmpty'
import PlacesAutoComplete from './PlacesAutoComplete'
import {Container, Header, Card} from 'semantic-ui-react'

class RestaurantsList extends Component {
  async componentDidMount() {
    await this.props.getRestaurants()
  }

  render() {
    const {restaurants} = this.props

    return (
      <Fragment>
        <Header>Favorite Restaurants</Header>
        {!restaurants.length && <RestaurantsEmpty />}
        <PlacesAutoComplete />
        {restaurants && (
          <Container>
            {/* CARD: Restaurant name, Area?? */}
            <Card.Group items={restaurants} />
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({restaurants: state.restaurants})

const mapDispatchToProps = dispatch => ({
  getRestaurants: () => dispatch(fetchRestaurants())
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsList)
