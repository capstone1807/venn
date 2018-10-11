import React from 'react'
import {connect} from 'react-redux'
import {
  fetchUsersFromDB,
  addFriend,
} from '../../store'
import {
  Message,
  Button,
  Form,
  Modal,
  Select
} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

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

  handleAdd = async () => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)

  }

  handleSubmit = () => {
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
          <Modal
            closeIcon
            trigger={
              <Form>
                <Form.Field inline>
              <Button onClick={this.handleOpen} color="vk" size="tiny" icon="search"/>
            <label>Search for people to add to your friends list</label>
            </Form.Field>
            </Form>

            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>Find Friends</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input>
              <Select
            onChange={this.handleChange}
            placeholder="search by name or username"
            search
            fluid
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
          />
          <Form.Button
                      color="google plus"
                      size="medium"
                      onClick={this.handleAdd}
                      icon="plus"
                      style = {styles.mLeft}
                    />

          </Form.Input>
                <Modal.Actions>
                  {submitted &&
                  <Message positive>
    <Message.Header>Success!</Message.Header>
      You've added this person to your friends list. You can add as many friends as you'd like.
  </Message>

                   }
                </Modal.Actions>
              </Form>
            </Modal.Content>
          </Modal>
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
