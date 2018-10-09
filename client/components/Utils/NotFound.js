import React from 'react'

import {Header, Icon, Grid} from 'semantic-ui-react'

const NotFound = ({message}) => {
  console.log('render NotFound')

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as="h2" icon textAlign="center">
          <Icon name="exclamation" circular />
          <Header.Subheader>{message}</Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid>
  )
}

export default NotFound
