import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants, removeRestaurant} from '../../store'
import NoData from '../Utils/NoData'
import PlacesAutoComplete from './PlacesAutoComplete'
import {Container, Header, Card, Button, Icon} from 'semantic-ui-react'

class RestaurantsList extends Component {

  async componentDidMount() {
    await this.props.getRestaurants()
  }

  handleClick = async (event, data) => {
    event.preventDefault()
    const restId = data.value
    console.log('REST ID =>', restId)
    await this.props.deleteRestaurant(restId)
  }

  render() {
    const {restaurants} = this.props
    return (
      <Fragment>
        <Header>Favorite Restaurants</Header>
        {!restaurants.length && (
          <NoData iconName="food" message="You have no restaurants saved" />
        )}
        <PlacesAutoComplete />
        {restaurants && (
          <Container>
          <Card.Group>
            {restaurants.map(item => (
              <Card key={item.id}>
                <Card.Content>
                  <Card.Header content={item.title} />
                  <Card.Meta content={item.description} />
                </Card.Content>
                <Button
                  attached="bottom"
                  circular
                  value={item.id}
                  onClick={this.handleClick}
                >
                  <Button.Content>
                    <Icon name="times circle outline" />
                  </Button.Content>
                </Button>
              </Card>
            ))}
          </Card.Group>
          </Container>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  getRestaurants: () => dispatch(fetchRestaurants()),
  deleteRestaurant: id => dispatch(removeRestaurant(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsList)
