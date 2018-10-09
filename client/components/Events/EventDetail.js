import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Header,
  Grid,
  Container,
  Card,
  Icon,
  GridColumn
} from 'semantic-ui-react'
import {fetchEvent} from '../../store'
import styles from '../Utils/Global.css'

class EventDetail extends React.Component {
  async componentDidMount() {
    await this.props.getEvent()
  }

  render() {
    const {currentEvent} = this.props
    console.log(currentEvent)
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={16}>
            <Container>
              <Header>Date: June 12 in rounded box</Header>
              {currentEvent.isPast ? 'Past Event' : 'Upcoming Event'}
              <div as="h3">Event Name: {currentEvent.name}</div>
              <div>Created By: {currentEvent.creatorName || '-'}</div>
              <div>
                {currentEvent.isPrivate ? 'Private Event' : 'Open Event'}
                <Icon name="question circle" color="grey" />
              </div>
            </Container>
          </Grid.Column>
          <Grid.Column width={16} style={styles.eventContent}>
            <Container>
              <Grid>
                <GridColumn width={8}>
                  <Header>Details</Header>
                  <p>(description) {currentEvent.description}</p>
                  <p>Who's going to be there? (6) / Who went? (6)</p>
                  <Card.Group>
                    {[{name: 'Cody Cody', username: 'codydog2018'}].map(
                      (item, idx) => (
                        <Card key={idx} width={4}>
                          <Card.Content textAlign="center">
                            <Icon name="user circle" color="grey" size="huge" />
                            <br />
                            <br />
                            <Card.Header
                              textAlign="center"
                              content={item.name}
                            />
                            <Card.Description
                              textAlign="center"
                              content={item.username}
                            />
                          </Card.Content>
                        </Card>
                      )
                    )}
                  </Card.Group>
                </GridColumn>
                <GridColumn width={8}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Content style={styles.mBottom}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Icon name="clock" color="grey" />
                            </Grid.Column>
                            <Grid.Column width={14}>
                              <p>Monday, February 21 2018</p>
                              <p>
                                Brunch
                                <Icon name="calendar alternate outline" />
                              </p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                      <Card.Content style={styles.mBottom}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>
                              <Icon name="pin" color="grey" />
                            </Grid.Column>
                            <Grid.Column width={14}>
                              <p>Restaurant</p>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card.Content>

                    <Card.Content>Map with pin</Card.Content>
                  </Card>
                </GridColumn>
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentEvent: state.currentEvent
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(Number(ownProps.match.params.id)))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
)
