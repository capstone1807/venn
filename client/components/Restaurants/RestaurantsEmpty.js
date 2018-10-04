import React from 'react'
import {Header, Icon, Grid} from 'semantic-ui-react'

export const RestaurantsEmpty = props => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as="h2" icon textAlign="center">
          <Icon name="food" circular />
          <Header.Subheader>You have no restaurants saved</Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid>
  )
}

export default RestaurantsEmpty
