import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import history from '../../history'
import {
  fetchEvent,
  fetchRestaurants,
  updateEventRestaurants,
  updateRespondedStatus
} from '../../store'
import {PlacesAutoComplete, ErrorMessage} from '../index'
import {Form, Header, Select, Container, Button} from 'semantic-ui-react'

export class GuestRestaurantChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      importance: 0
    }
  }
  async componentDidMount() {
    await this.props.getEvent()
    await this.props.getRestaurants()
  }

  handleChangeRestaurants = (event, data) => {
    event.persist()
    this.setState({
      restaurants: data.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.state.restaurants.length <= 3) {
      await this.props.scoreRestaurants(
        this.props.currentEvent.id,
        this.state.restaurants,
        this.state.importance
      )
      await this.props.updateStatus(this.props.currentEvent.id)
      // push only if successful
      history.push('/events')
    }
  }

  handleClickMust = () => {
    this.setState({importance: 2.25})
  }

  handleClickLike = () => {
    this.setState({importance: 1.5})
  }

  handleClickWhat = () => {
    this.setState({importance: 1})
  }

  render() {
    const {restaurants} = this.props
    const {currentEvent} = this.props
    const restaurantItems = restaurants.map(item => {
      return {text: item.title, value: item.placeId}
    })
    return (
      <Fragment>
        {/* event name */}
        <Header>{currentEvent && currentEvent.name}</Header>
        {/* choose restaurant */}
        <h3>Choose restaurant:</h3>
        {/* search select from favorites */}
        {this.state.restaurants.length > 3 && (
          <ErrorMessage
            headerMessage="Oops! You can only suggest 3 restaurants"
            message="Please remove a restaurant before submitting"
          />
        )}
        <Form verticalalign="middle" onSubmit={this.handleSubmit}>
          <Container style={{width: 538}}>
            <Select
              placeholder="choose from your favorites"
              fluid
              search
              multiple
              selection
              options={restaurantItems}
              onChange={this.handleChangeRestaurants}
            />
          </Container>
          {/* importance rating button group */}
          <Container>
            <h3>Importance:</h3>
            <Button.Group>
              <Button type="button" onClick={this.handleClickMust}>
                It's a must
              </Button>
              <Button type="button" onClick={this.handleClickLike}>
                I'd like it
              </Button>
              <Button type="button" onClick={this.handleClickWhat}>
                Whatever
              </Button>
            </Button.Group>
          </Container>
          {/* cancel and next buttons */}
          <h3>Need more favorites?</h3>
          {/* google places api search reusable component */}
          <Container style={{width: 538}}>
            <PlacesAutoComplete />
          </Container>
          <Container>
            <Form.Button type="button" onClick={() => history.goBack()}>
              Cancel
            </Form.Button>
            <Form.Button color="vk">Submit Choices</Form.Button>
          </Container>
        </Form>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentEvent: state.currentEvent,
  restaurants: state.restaurants
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(Number(ownProps.match.params.id))),
  getRestaurants: () => dispatch(fetchRestaurants()),
  scoreRestaurants: (eventId, restaurantKeys, importance) =>
    dispatch(updateEventRestaurants(eventId, restaurantKeys, importance)),
  updateStatus: eventId => dispatch(updateRespondedStatus(eventId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GuestRestaurantChoice)
)
