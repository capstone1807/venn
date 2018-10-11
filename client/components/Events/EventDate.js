import React from 'react'
import {Message} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

const EventDate = ({date}) => {
  const month = date.substring(0, 3).toUpperCase()
  const day = date.split(',')[0].slice(-2)
  return (
    <Message style={{...styles.inline, ...styles.centerText}}>
      <Message.Header
        style={{...styles.redText, ...styles.font2, ...styles.mBottomTiny}}
      >
        {day}
      </Message.Header>
      <Message.Header>{month}</Message.Header>
    </Message>
  )
}

export default EventDate
