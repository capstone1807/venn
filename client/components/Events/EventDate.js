import React from 'react'
import {Message} from 'semantic-ui-react'
import {getMonthFromDate} from '../../../UtilFuncs/formatDate'
import styles from '../Utils/Global.css'

const EventDate = ({date}) => {
  const prettyMonth = date && getMonthFromDate(date)
  const day = date && date.substring(0, 2)
  return (
    <Message style={{...styles.inline, ...styles.centerText}}>
      <Message.Header
        style={{...styles.redText, ...styles.font2, ...styles.mBottomTiny}}
      >
        {day}
      </Message.Header>
      <Message.Header>{prettyMonth}</Message.Header>
    </Message>
  )
}

export default EventDate
