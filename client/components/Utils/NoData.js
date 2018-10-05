import React from 'react'
import {Header, Icon, Grid} from 'semantic-ui-react'

export const NoData = ({iconName, message}) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header as="h2" icon textAlign="center">
          <Icon name={iconName} circular />
          <Header.Subheader>{message}</Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid>
  )
}

export default NoData
