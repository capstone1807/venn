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
    this.handleChangeEventName = this.handleChangeEventName.bind(this)
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeGuests = this.handleChangeGuests.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getFriends()
  }

  handleChangeEventName(event) {
    event.persist()
    this.setState({
      eventName: event.target.value
    })
  }

  handleChangeDescription(event) {
    event.persist()
    this.setState({
      description: event.target.value
    })
  }

  handleChangeGuests(event, data) {
    event.persist()
    this.setState({
      guests: data.value
    })
  }

  toggle() {
    this.setState(state => {
      return {isPrivate: !state.isPrivate}
    })
  }

  handleSubmit(event) {
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
        <Form centered verticalalign='middle' onSubmit={this.handleSubmit}>
          <Container centered style={{width: 500}}>
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
          <Container centered style={{width: 538}}>
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
          <Grid centered verticalalign='middle'>
            <Grid.Row style={{width: 500}}>
              <Grid.Column style={{width: 300}}>
                <h3>Friends can invite friends</h3>
              </Grid.Column>
              <Grid.Column>
                <Radio toggle onChange={this.toggle} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Form.Button>Cancel</Form.Button>
              <Form.Button color='orange'>Next</Form.Button>
            </Grid.Row>
            </Grid>
        </Form>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends.friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(fetchFriends()),
  createEvent: newEvent => dispatch(postEvent(newEvent))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
