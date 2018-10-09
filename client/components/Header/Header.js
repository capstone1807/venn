import React from 'react'
import {Image, Icon, Grid} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

const Header = props => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Icon
            name="bars"
            style={styles.marginTopLeft}
            size="big"
            onClick={props.handleButtonClick}
          />
        </Grid.Column>
        <Grid.Column>
          <Image
            style={styles.marginTopLeft}
            src="/assets/venn-logo.png"
            width="60"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Header
