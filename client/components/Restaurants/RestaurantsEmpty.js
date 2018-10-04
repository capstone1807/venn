import React from 'react'
import {Header, Icon, Grid, Button} from 'semantic-ui-react'
import history from '../../history'

export const RestaurantsEmpty = props => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as="h2" icon textAlign="center">
          <Icon name="food" circular />
          <Header.Content>Restaurants</Header.Content>
          <Header.Subheader>You have no restaurants saved</Header.Subheader>
        </Header>
        <Button
          primary
          animated
          onClick={() => history.push('/restaurants/add')}
        >
          <Button.Content visible>Add Restaurant</Button.Content>
          <Button.Content hidden>
            <Icon name="plus" />
          </Button.Content>
        </Button>
      </Grid.Column>
    </Grid>
  )
}

export default RestaurantsEmpty
