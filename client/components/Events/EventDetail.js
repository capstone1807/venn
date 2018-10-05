import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Header, Grid, Container, Divider} from 'semantic-ui-react'
import {fetchEvent} from '../../store'

class EventDetail extends React.Component{
  async componentDidMount(){
    await this.props.getEvent()
  }

  render(){
    const {currentEvent} = this.props
    console.log(currentEvent)
    return(
      <Fragment>
        <Container text>
        <Header>{currentEvent && currentEvent.name}</Header>
        <Grid>
          <Grid.Column width={8}>
            <h3>When:</h3>
          </Grid.Column>
          <Grid.Column width={8}>
            February 21
            <Divider hidden />
            Brunch
          </Grid.Column>
          <Grid.Column width={8}>
          <h3>Where:</h3>
          </Grid.Column>
          <Grid.Column width={8}>
            Restaurant
          </Grid.Column>
          <Grid.Column width={8}>
          <h3>Who's going to be there:</h3>
          </Grid.Column>
          <Grid.Column width={8}>
            Guest1, Guest2, Guest3, Guest4
          </Grid.Column>
        </Grid>
        </Container>
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  currentEvent: state.currentEvent,
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(Number(ownProps.match.params.id))),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetail)
)
