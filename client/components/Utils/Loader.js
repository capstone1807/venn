import React from 'react'
import {Icon} from 'semantic-ui-react'
import styles from './Global.css'

const LoaderPage = () => (
  <div style={styles.loader}>
    <Icon loading name="asterisk" size="huge" color="grey" />
  </div>
)

export default LoaderPage
