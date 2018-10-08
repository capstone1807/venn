import React from 'react'
import {connect} from 'react-redux'
import {
  fetchUsersFromDB,
  fetchFriends,
  addFriend,
  removeFriend
} from '../../store'
import NoData from '../Utils/NoData'
import {
  Divider,
  Select,
  Form,
  Container,
  Header,
  Segment,
  Card,
  Button,
  Icon
} from 'semantic-ui-react'

export class FriendsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: '',
      isReversed: false,
      icon: 'sort alphabet up'
    }
  }

  async componentDidMount() {
    await this.props.getUsers()
    await this.props.getFriends()
    this.props.friends.sort((a, b) => {
      const A = a.firstName.toUpperCase();
      const B = b.firstName.toUpperCase();
    let comparison = 0;
    (A > B) ? comparison = 1 : comparison = -1;
    return comparison;
  });
  }

  handleChange = (event, data) => {
    this.setState({selectedUser: data.value})
  }

  handleClick = async (event, data) => {
    event.preventDefault()
    const friendId = data.value
    await this.props.deleteFriend(friendId)
  }

  handleSort = () => {
    if (!this.state.isReversed) {
      this.setState({icon: 'sort alphabet down', isReversed: true})
      this.props.friends.reverse()
    } else {
      this.setState({icon: 'sort alphabet up', isReversed: false})
      this.props.friends.reverse()
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)
  }

  render() {
    const {users, friends} = this.props
    console.log(friends)
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
      <Container textAlign="center">
        <Segment vertical style={{width: 500}}>
          <Header as="h2">Your Friends</Header>
          <Divider hidden />
          {!friends.length && (
            <NoData
              iconName="frown outline"
              message="You have no friends saved"
            />
          )}
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
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>
            <Form.Button content="Add friend!" color="teal" size="medium" />
          </Form>
        </Segment>
        <Container>
          <Button onClick={this.handleSort}>
            <Icon name={this.state.icon} />
          </Button>
          <Card.Group>
            {friends.map(item => (
              <Card key={item.id}>
                <Card.Content>
                  <Card.Header content={`${item.firstName} ${item.lastName}`} />
                  <Card.Description content={item.username} />
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
        </Container>
        <Divider hidden />
      </Container>
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
  getFriends: () => dispatch(fetchFriends()),
  deleteFriend: id => dispatch(removeFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
