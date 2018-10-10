import React from 'react'
import {connect} from 'react-redux'
import {
  fetchUsersFromDB,
  addFriend,
} from '../../store'
import styles from '../Utils/Global.css'
import {Form, Button, Select} from
'semantic-ui-react'

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
        </Form.Field>
        <Form.Group inline >
      <Select
            onChange={this.handleChange}
            placeholder="search by name or username"
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
          <Button icon="plus" color="google plus" size="medium" style={styles.mLeft} onSubmit={this.handleSubmit}/>
          </Form.Group>
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
