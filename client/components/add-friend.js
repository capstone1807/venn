import React from 'react'
import {connect} from 'react-redux'
import {fetchUsersFromDB, addFriend} from '../store'
import {
  Search,
  Grid,
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
    console.log('USERNAME*****: ', username)
    const users = this.props.users.slice()
    const filtered = users.filter(user => user.username === username)
    console.log('FILTERED***: ', filtered)
    const id = filtered[0].id
    console.log('ID***: ', id)
    await this.props.addToFriends(id)
  }

  render() {
    console.log('USERS => ', this.props.users)
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
        <Segment vertical>
          <Header as="h2">Find your friends:</Header>
          <Divider hidden />
          <Select
            onChange={this.handleChange}
            placeholder="Search Name"
            search
            options={userNames ? userNames : [{key: 999, text: 'hello'}]}
            value={this.state.value}
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
