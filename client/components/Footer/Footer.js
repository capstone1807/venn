import React from 'react'
import {Container, Header} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

const Footer = props => {
  return (
    <div style={styles.footer}>
      <Container text align="center">
        <Header
          as="h4"
          content={`\u00A9 VENN`}
          style={{...styles.pTop2, ...styles.pBottom2}}
        />
      </Container>
    </div>
  )
}

export default Footer
