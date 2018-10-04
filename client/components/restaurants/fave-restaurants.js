import React from 'react'
// import {connect} from 'react-redux'
// import {fetchRestaurants} from '../../store'
import {Card, Container, Header} from 'semantic-ui-react'

export class FaveRestaurants extends React.Component {
  // async componentDidMount() {
  //   await this.props.getRestaurants()
  // }

  render() {
    const restaurants = [
      {
        header: 'Dairy Queen',
        description: 'blah blah',
        meta: 'ROI: 30%'
      },
      {
        header: 'IHOP',
        description: 'blah blah',
        meta: 'ROI: 34%'
      },
      {
        header: 'Chuck E Cheese',
        description: 'blah blahblah blahblah blahblah blah',
        meta: 'ROI: 27%'
      }
    ]
    return (
      <Container>
        <Header>Favorite Restaurants</Header>
        {/* CARD: Restaurant name, Area?? */}
        <Card.Group items={restaurants} />
      </Container>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   getRestaurants: () => dispatch(fetchRestaurants())
// })

// export default connect(null, mapDispatchToProps)(FaveRestaurants)

export default FaveRestaurants
