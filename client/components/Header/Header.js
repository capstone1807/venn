import React from 'react'
import {Image, Icon, Grid} from 'semantic-ui-react'

const Header = props => {
  return (
    <Grid container>
      <Grid.Column>
        <Icon name="bars" size="big" onClick={props.handleButtonClick} />
      </Grid.Column>
      <Grid.Column>
        <Image src="assets/venn-logo.png" />
      </Grid.Column>
    </Grid>
  )
}

export default Header
