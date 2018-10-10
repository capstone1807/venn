import React from 'react'
import {connect} from 'react-redux'
import {
  fetchUsersFromDB,
  addFriend,
} from '../../store'
import {
  Container,
  Button,
  Form,
  Segment,
  Modal,
  Icon,
  Select
} from 'semantic-ui-react'

export class AddFriendsModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: '',
      modalOpen: false,
      submitted: false
    }
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

  handleChange = (e, {value}) => this.setState({selectedUser: value})

  handleSubmit = async () => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)
    this.setState({submitted: true})

  }

  handleOpen = () => {
    this.setState({modalOpen: true})
  }

  handleClose = () => {
    this.setState({modalOpen: false})
  }

  render() {
    const {users, friends} = this.props
    const {submitted} = this.state
    const friendUsernames = friends.map(friend => friend.username)
    const notFriends = users.filter(
      user => !friendUsernames.includes(user.username)
    )
    const userOptions =
      notFriends &&
      notFriends.map(function(user) {
        return {
          key: user.username,
          value: user.username,
          text:
            user.firstName + ' ' + user.lastName + ' (' + user.username + ')'
        }
      })
    return (
      <Form>
        <Segment textAlign="center" vertical>
          <Form.Field>
            <label>Search for people to add to your friends list</label>
          </Form.Field>

          <Modal
            trigger={
              <Button onClick={this.handleOpen} color="vk">
                Find 'em!
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Search by name or username:</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
              <Select
            onChange={this.handleChange}
            placeholder="Search Name"
            search
            options={
              userOptions
                ? userOptions
                : [
                    {
                      key: 999,
                      text: 'add your friends'
                    }
                  ]
            }
            value={this.state.value}
            fluid
          />
                <Modal.Actions>
                  {!submitted ? (
                    <Form.Button
                      color="google plus"
                      size="medium"
                      onSubmit={this.handleSubmit}
                    >
                      <Icon name="plus" />Add Friend
                    </Form.Button>
                  ) : (
                    <Container as="h4">
                      <Segment>[Name] will now appear in your friends list!</Segment>
                      <Form.Button
                        color="vk"
                        onClick={this.handleClose}
                        content="Thanks!"
                      />
                    </Container>
                  )}
                </Modal.Actions>
              </Form>
            </Modal.Content>
          </Modal>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  friends: state.friends
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsersFromDB()),
  addToFriends: id => dispatch(addFriend(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsModal)
