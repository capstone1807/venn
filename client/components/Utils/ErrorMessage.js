import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = (props) => (
  <Message negative>
    <Message.Header>{props.headerMessage}</Message.Header>
    <p>{props.message}</p>
  </Message>
)

export default ErrorMessage
