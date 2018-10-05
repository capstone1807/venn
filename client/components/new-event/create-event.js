import React from 'react'
import {connect} from 'react-redux'
import {fetchFriends, postEvent} from '../../store'
import {
  Form,
  TextArea,
  Select,
  Radio,
  Container,
  Divider,
  Grid
} from 'semantic-ui-react'

export class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventName: '',
      description: '',
      guests: [],
      isPrivate: false
    }
  }
  async componentDidMount() {
    await this.props.getFriends()
  }

  handleChangeEventName = (event) => {
    event.persist()
    this.setState({
      eventName: event.target.value
    })
  }

  handleChangeDescription = (event) => {
    event.persist()
    this.setState({
      description: event.target.value
    })
  }

  handleChangeGuests = (event, data) => {
    event.persist()
    this.setState({
      guests: data.value
    })
  }

  toggle = () => {
    this.setState(state => {
      return {isPrivate: !state.isPrivate}
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createEvent(this.state)
  }

  render() {
    const friends =
      this.props.friends &&
      this.props.friends.map(function(friend) {
        return {
          key: friend.username,
          value: friend.username,
          text: friend.firstName + ' ' + friend.lastName
        }
      })
    return (
        <Form verticalalign='middle' onSubmit={this.handleSubmit}>
          <Container style={{width: 500}}>
            <Form.Field>
              <label>Name Your Event</label>
              <input
                placeholder="Event Name"
                onChange={this.handleChangeEventName}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <TextArea
                autoHeight
                placeholder="Anything else you want your guests to know?"
                onChange={this.handleChangeDescription}
              />
            </Form.Field>
          </Container>
          <Container style={{width: 538}}>
            <Select
              placeholder="choose friends"
              fluid
              search
              multiple
              selection
              options={friends}
              onChange={this.handleChangeGuests}
            />
          </Container>
          <Divider horizontal hidden />
          <h3>Friends can invite friends</h3>
          <Radio toggle onChange={this.toggle} />
          <Form.Button>Cancel</Form.Button>
          <Form.Button color='orange'>Next</Form.Button>
        </Form>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(fetchFriends()),
  createEvent: newEvent => dispatch(postEvent(newEvent))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
