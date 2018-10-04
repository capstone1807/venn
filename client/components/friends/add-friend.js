import React from 'react'
import {connect} from 'react-redux'
import {fetchUsersFromDB, addFriend} from '../../store'
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
    // OB: could use an arrow class method definition instead (with the right babel plugin)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    // OB: should stick with this for now, could talk about "lazy" loading if this gets slow with "typeahead" component
    await this.props.getUsers()
  }

  handleChange(event) {
    // OB: more about this here https://reactjs.org/docs/events.html
    event.persist()
    // OB: curious about using `.value` here, maybe use the second parameter to this callback, `data`
    this.setState({selectedUser: event.target.textContent})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const username = this.state.selectedUser.split(' ')[2].slice(1, -1)
    // OB: unnecessary copying of users array
    const users = this.props.users.slice()
    // OB: could use `.find` which is like filter but just returns the first one
    const filtered = users.filter(user => user.username === username)
    const id = filtered[0].id
    await this.props.addToFriends(id)
  }

  render() {
    // OB: `userNames` feels more like it should be `userNameOptions`
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

// OB: could use the object format for mapDispatchToProps here...
/*
const mapDispatchToProps = {
  getUsers: fetchUsersFromDB,
  addToFriends: addFriend
};
*/
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsersFromDB()),
  addToFriends: id => dispatch(addFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
