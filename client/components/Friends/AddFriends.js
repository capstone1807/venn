import React from 'react'
import {connect} from 'react-redux'
import {
  fetchUsersFromDB,
  addFriend,
} from '../../store'
import {Form, Button, Icon, Select} from 'semantic-ui-react'

export class AddFriends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: '',
    }
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

    handleChange = (event, data) => {
      this.setState({selectedUser: data.value})
    }

  handleSubmit = async event => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)
  }

  render(){
    const {users, friends} = this.props
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
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
        <label>Search for people to add to your friends list</label>
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

          <Form.Button color="google plus" size="medium" onSubmit={this.handleSubmit}>
            <Icon name="plus" />Add Friend
          </Form.Button>
          </Form.Field>
        </Form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends)
