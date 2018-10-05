import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../../store'
import NoData from '../Utils/NoData'
import PlacesAutoComplete from './PlacesAutoComplete'
import {Container, Header, Card} from 'semantic-ui-react'

class RestaurantsList extends Component {
  async componentDidMount() {
    await this.props.getRestaurants()
  }

  render() {
    const {restaurants} = this.props
    const restaurantItems = restaurants.map(item => {
      return {header: item.title, meta: item.description}
    })
    return (
      <Fragment>
        <Header>Favorite Restaurants</Header>
        {!restaurants.length && (
          <NoData iconName="food" message="You have no restaurants saved" />
        )}
        <PlacesAutoComplete />
        {restaurants && (
          <Container>
            <Card.Group items={restaurantItems} />
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
