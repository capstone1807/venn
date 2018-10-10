import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Link} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, action, error} = props
  const isSignup = name === 'signup'

  return (
    <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
      <Grid.Column style={{maxWidth: 450}}>
        {/* HEADER */}

        <Header as="h2" textAlign="center">
          <Image src="/assets/venn-logo.png" />
          {displayName}
        </Header>
        <Form size="large" onSubmit={handleSubmit} name={name}>
          <Segment stacked>
            {isSignup && (
              <Fragment>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Create a Username"
                  name="username"
                  type="text"
                />
              </Fragment>
            )}
            <Form.Input
              icon="at"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="text"
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
            />
            <Button fluid color="vk" size="large" style={styles.mBottom}>
              {displayName}
            </Button>
            <Button fluid as={Link} to="/auth/google" color="google plus">
              <Icon name="google" />
              {displayName} with Google
            </Button>
          </Segment>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>

        <Message>
          <Header as="h4">
            {action.message}
            <br />
            <br />
            <Button as={Link} to={action.to} color="vk" content={action.name} />
          </Header>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    action: {
      name: 'Sign Up',
      message: 'First time?',
      to: 'signup'
    },
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    action: {
      name: 'Login',
      message: 'Already have an account?',
      to: 'login'
    },
    error: state.user.error
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth({email, password}, formName))
    }
  }
}
const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const formName = evt.target.name
      const username = evt.target.username.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth({username, firstName, lastName, email, password}, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
