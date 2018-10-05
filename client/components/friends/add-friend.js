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
  }

  async componentDidMount() {
    await this.props.getUsers()
  }

  handleChange = (event, data) => {
    this.setState({selectedUser: data.value})
  }

 handleSubmit =  async (event) => {
    event.preventDefault()
    const username = this.state.selectedUser
    const id = this.props.users.find(user => user.username === username).id
    await this.props.addToFriends(id)
  }

  render() {
    const userOptions =
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
              userOptions
                ? userOptions
                : [
                    {
                      key: 999,
                      value: 'default username',
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

const mapDispatchToProps = {
  getUsers: fetchUsersFromDB,
  addToFriends: addFriend
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
