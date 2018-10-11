import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants, removeRestaurant} from '../../store'
import NoData from '../Utils/NoData'
import PlacesAutoComplete from './PlacesAutoComplete'
import LoaderPage from '../Utils/Loader'
import style from '../Utils/Global.css'
import {Container, Header, Card, Button, Icon, Grid} from 'semantic-ui-react'

class RestaurantsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReversed: false,
      icon: 'sort alphabet up',
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.getRestaurants()
    this.props.restaurants.sort((a, b) => {
      const A = a.title.toUpperCase();
      const B = b.title.toUpperCase();
    let comparison = 0;
    (A > B) ? comparison = 1 : comparison = -1;
    return comparison;
  });
  this.setState({isLoading: false})

  }

  handleClick = async (event, data) => {
    event.preventDefault()
    const restId = data.value
    await this.props.deleteRestaurant(restId)
  }

  handleSort = () => {
    if (!this.state.isReversed) {
      this.setState({icon: 'sort alphabet down', isReversed: true})
      this.props.restaurants.reverse()
    } else {
      this.setState({icon: 'sort alphabet up', isReversed: false})
      this.props.restaurants.reverse()
    }
  }

  render() {
    const {restaurants} = this.props
    return (
      <Container>
      {this.state.isLoading ? (<LoaderPage/>) : (
        <Grid>
        <Grid.Column width={16}>
              <Header as="h1" content="Restaurants" style={style.h1} />
            </Grid.Column>

        {!restaurants.length ? (
          <Fragment>
          <Grid.Column width={16} textAlign="center">
          <NoData iconName="food" message="You have no restaurants saved" />
          </Grid.Column>
          <Grid.Column width={16}>
          <PlacesAutoComplete />
                </Grid.Column>
          </Fragment>
        ) : (
          <Fragment>
                <Grid.Column width={16}>
        <PlacesAutoComplete />
        </Grid.Column>
                <Grid.Column width={16}>
        <Button color='vk' onClick={this.handleSort}>
            <Icon name={this.state.icon}/>
          </Button>
          </Grid.Column>
                <Grid.Column width={16}>
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
          </Grid.Column>
          </Fragment>
        )}
      </Grid>
      )}
      </Container>
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
