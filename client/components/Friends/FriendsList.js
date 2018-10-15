import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {fetchFriends, removeFriend} from '../../store'
import NoData from '../Utils/NoData'
import LoaderPage from '../Utils/Loader'
import style from '../Utils/Global.css'
import AddFriends from './AddFriends'
import {Container, Header, Card, Button, Icon, Grid} from 'semantic-ui-react'

export class FriendsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReversed: false,
      icon: 'sort alphabet up',
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.getFriends()
    const {friends} = this.props
    friends.length &&
      friends.sort((a, b) => {
        const A = a.firstName.toUpperCase()
        const B = b.firstName.toUpperCase()
        let comparison = 0
        A > B ? (comparison = 1) : (comparison = -1)
        return comparison
      })
    this.setState({isLoading: false})
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

  render() {
    const {friends} = this.props
    return (
      <Container style={style.container}>
        {this.state.isLoading ? (
          <LoaderPage />
        ) : (
          <Grid>
            <Grid.Column width={16}>
              <Header as="h1" content="Friends" style={style.h1} />
            </Grid.Column>

            {!friends.length ? (
              <Fragment>
                <Grid.Column width={16} textAlign="center">
                  <NoData
                    iconName="frown outline"
                    message="You have no friends saved"
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <AddFriends />
                </Grid.Column>
              </Fragment>
            ) : (
              <Fragment>
                <Grid.Column width={16}>
                  <AddFriends />
                </Grid.Column>
                <Grid.Column width={16}>
                  <Button color="vk" onClick={this.handleSort}>
                    <Icon name={this.state.icon} />
                  </Button>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Card.Group>
                    {friends.map(item => (
                      <Card key={item.id}>
                        <Card.Content>
                          <Card.Header
                            content={`${item.firstName} ${item.lastName}`}
                          />
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
                </Grid.Column>
              </Fragment>
            )}
          </Grid>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  friends: state.friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(fetchFriends()),
  deleteFriend: id => dispatch(removeFriend(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList)
