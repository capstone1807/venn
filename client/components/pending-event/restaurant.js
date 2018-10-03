import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchEvent} from '../../store'
import {
  Form,
  Header,
  TextArea,
  Select,
  Radio,
  Container,
  Button,
  Divider,
  Grid
} from 'semantic-ui-react'

export class GuestRestaurantChoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      importance: 0
    }
    this.handleChangeRestaurants = this.handleChangeRestaurants.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getEvent()
  }

  handleChangeRestaurants(event, data) {
    event.persist()
    this.setState({
      restaurants: data.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createEvent(this.state)
  }

  render() {
    const restaurants = [{
      key: 1,
      value: 'Dippy\'s delicious dots',
      text: 'Dippy\'s delicious dots'
    }, {
      key: 2,
      value: 'Big Bellatrix Steakhouse',
      text: 'Big Bellatrix Steakhouse'
    }]
    console.log("CURRENT: ", this.props.currentEvent)
    const {currentEvent} = this.props
    return (
      <Container>
        {/* event name */}
        <Header>{currentEvent.name}</Header>
        {/* choose restaurant */}
        <h3>Choose restaurant:</h3>
        {/* google places api search reusable component */}
        {/* search select from favorites */}
        <Container centered style={{width: 538}}>
           <Select
             placeholder="choose from your favorites"
             fluid
             search
             multiple
             selection
             options={restaurants}
             onChange={this.handleChangeRestaurants}
           />
         </Container>
        {/* importance rating button group */}
        <Container>
          <Button.Group>
            <Button>Dealbreaker</Button>
            <Button>I'd like it</Button>
            <Button>Whatever</Button>
          </Button.Group>
        </Container>
        {/* cancel and next buttons */}
      </Container>














  //       <Form centered verticalAlign='middle' onSubmit={this.handleSubmit}>
  //         <Container centered style={{width: 500}}>
  //           <Form.Field>
  //             <label>Name Your Event</label>
  //             <input
  //               placeholder="Event Name"
  //               onChange={this.handleChangeEventName}
  //             />
  //           </Form.Field>

  //           <Form.Field>
  //             <label>Description</label>
  //             <TextArea
  //               autoHeight
  //               placeholder="Anything else you want your guests to know?"
  //               onChange={this.handleChangeDescription}
  //             />
  //           </Form.Field>
  //         </Container>
  //         <Container centered style={{width: 538}}>
  //           <Select
  //             placeholder="choose friends"
  //             fluid
  //             search
  //             multiple
  //             selection
  //             options={friends}
  //             onChange={this.handleChangeGuests}
  //           />
  //         </Container>
  //           <Divider horizontal hidden />
  //         <Grid centered verticalAlign='middle'>
  //           <Grid.Row style={{width: 500}}>
  //             <Grid.Column style={{width: 300}}>
  //               <h3>Friends can invite friends</h3>
  //             </Grid.Column>
  //             <Grid.Column>
  //               <Radio toggle onChange={this.toggle} />
  //             </Grid.Column>
  //           </Grid.Row>
  //           <Grid.Row>
  //             <Form.Button>Cancel</Form.Button>
  //             <Form.Button color='orange'>Next</Form.Button>
  //           </Grid.Row>
  //           </Grid>
  //       </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  currentEvent: state.currentEvent
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getEvent: () => dispatch(fetchEvent(Number(ownProps.match.params.id))),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GuestRestaurantChoice))
