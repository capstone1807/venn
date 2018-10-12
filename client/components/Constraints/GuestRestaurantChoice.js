import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import history from '../../history'
import styles from '../Utils/Global.css'
import {
  fetchEvent,
  fetchRestaurants,
  updateEventRestaurants,
  updateRespondedStatus
} from '../../store'
import {PlacesAutoComplete, ErrorMessage} from '../index'
import {
  Form,
  Header,
  Select,
  Container,
  Button,
  Modal,
  Radio
} from 'semantic-ui-react'

export class GuestRestaurantChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      importance: 0,
      modalOpen: false
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

  handleOpen = () => {
    this.setState({modalOpen: true})
  }

  handleClose = () => {
    this.setState({modalOpen: false})
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

  handleClickImportance = (e, {value}) => {
    let importance
    switch (value) {
      case 'must':
        importance = 2.25
        break
      case 'like':
        importance = 1.5
        break
      case 'whatever':
      default:
        importance = 1
        break
    }
    this.setState({importance})
  }

  render() {
    const {restaurants} = this.props
    const {currentEvent} = this.props
    const restaurantItems = restaurants.map(item => {
      return {
        text: item.title,
        description: item.description,
        value: item.placeId
      }
    })
    return (
      <Container style={{width: 500, ...styles.pBottom2, ...styles.container}}>
        <Form verticalalign="middle">
          <Header>{currentEvent && currentEvent.name}</Header>
          <Form.Field>
            <label>
              Choose Restaurants{' '}
              <span style={styles.blueGrayText}>(max 3)</span>
            </label>
            {this.state.restaurants.length > 3 && (
              <ErrorMessage
                headerMessage="Oops! You can only suggest 3 restaurants"
                message="Please remove a restaurant before submitting"
              />
            )}
            <Select
              placeholder="Choose from your favorites"
              fluid
              search
              multiple
              selection
              options={restaurantItems}
              onChange={this.handleChangeRestaurants}
              style={styles.mSmallTop}
            />
          </Form.Field>
          <Form.Field>
            <label>Importance</label>
            <Form.Group>
              <Form.Field>
                <Radio
                  label={"It's a must"}
                  name="importance"
                  value="must"
                  onChange={this.handleClickImportance}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={"I'd like it"}
                  name="importance"
                  value="like"
                  onChange={this.handleClickImportance}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Whatever"
                  name="importance"
                  value="whatever"
                  onChange={this.handleClickImportance}
                />
              </Form.Field>
            </Form.Group>
          </Form.Field>
        </Form>

        <label style={styles.mTop}>Need more favorites?</label>

        <Modal
          closeIcon
          trigger={
            <Button
              type="button"
              content="Find some more!"
              style={styles.mSmallTop}
              onClick={this.handleOpen}
            />
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header>Find Restaurants</Modal.Header>
          <Modal.Content>
            <PlacesAutoComplete />
          </Modal.Content>
        </Modal>
        <Container>
          <Button
            floated="right"
            style={styles.mTop}
            color="vk"
            onClick={this.handleSubmit}
          >
            Submit Choices
          </Button>
          <Button
            floated="right"
            style={styles.mTop}
            type="button"
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
        </Container>
      </Container>
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
