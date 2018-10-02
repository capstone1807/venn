import React from 'react'
import {connect} from 'react-redux'
import {fetchUsersFromDB, addFriend} from '../store'
import {
  Divider,
  Select,
  Form,
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

export class AddFriend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedUser: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

  handleChange(event) {
    event.persist()
    this.setState({selectedUser: event.target.textContent})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const username = this.state.selectedUser.split(' ')[2].slice(1, -1)
    const users = this.props.users.slice()
    const filtered = users.filter(user => user.username === username)
    const id = filtered[0].id
    await this.props.addToFriends(id)
  }

  render() {
    const userNames =
      this.props.users &&
      this.props.users.map(function(user) {
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
          <Header as="h2">Find your friends:</Header>
          <Divider hidden />
          <Select
            onChange={this.handleChange}
            placeholder="Search Name"
            search
            options={
              userNames
                ? userNames
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
        <Divider hidden />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.friends.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsersFromDB()),
  addToFriends: id => dispatch(addFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
