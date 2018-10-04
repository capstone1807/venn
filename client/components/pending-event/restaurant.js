import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchEvent, updateEventRestaurants} from '../../store'
import {
  Form,
  Header,
  TextArea,
  Select,
  Radio,
  Container,
  Button,
  Divider,
  Grid
} from 'semantic-ui-react'

export class GuestRestaurantChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      importance: 0
    }
    this.handleChangeRestaurants = this.handleChangeRestaurants.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getEvent()
  }

  handleChangeRestaurants(event, data) {
    event.persist()
    this.setState({
      restaurants: data.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.scoreRestaurants(this.props.currentEvent.id, this.state.restaurants, this.state.importance)
  }

  handleClickDeal = () => {
    this.setState({importance: 2.25})
  }

  handleClickLike = () => {
    this.setState({importance: 1.5})
  }

  handleClickWhat = () => {
    this.setState({importance: 1})
  }

  render() {
    const restaurants = [{
      key: 1,
      id: 17,
      value: 17,
      text: 'Dippy\'s delicious dots'
    }, {
      key: 2,
      id: 48,
      value: 48,
      text: 'Big Bellatrix Steakhouse'
    }]
    console.log("CURRENT: ", this.props.currentEvent)
    const {currentEvent} = this.props
    return (
      <Form centered verticalalign='middle' onSubmit={this.handleSubmit}>
        {/* event name */}
        <Header>{currentEvent.name}</Header>
        {/* choose restaurant */}
        <h3>Choose restaurant:</h3>
        {/* google places api search reusable component */}
        {/* search select from favorites */}
        <Container centered style={{width: 538}}>
           <Select
             placeholder="choose from your favorites"
             fluid
             search
             multiple
             selection
             options={restaurants}
             onChange={this.handleChangeRestaurants}
           />
         </Container>
        {/* importance rating button group */}
        <Container>
          <Button.Group>
            <Button onClick={this.handleClickDeal}>Dealbreaker</Button>
            <Button onClick={this.handleClickLike}>I'd like it</Button>
            <Button onClick={this.handleClickWhat}>Whatever</Button>
          </Button.Group>
        </Container>
        {/* cancel and next buttons */}
        <Container>
          <Form.Button >Cancel</Form.Button>
          <Form.Button color='orange'>Next</Form.Button>
        </Container>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  currentEvent: state.currentEvent
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(Number(ownProps.match.params.id))),
  scoreRestaurants: (eventId, restaurants, importance) => dispatch(updateEventRestaurants(eventId, restaurants, importance))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuestRestaurantChoice))
