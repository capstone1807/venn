import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider } from 'semantic-ui-react'


/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const otherName = (name === 'signup') ? 'Log In' : 'Sign Up'
  const isSignup = name === 'signup'
  console.log('NAME =>', name)
  console.log('DISPLAY NAME =>', displayName)


  return (
<div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* HEADER */}

        <Header as='h2' textAlign='center'>
          {displayName}
        </Header>
        <Form size='large' onSubmit={handleSubmit} name={name}>
          <Segment stacked>
          {isSignup && (
            <Fragment>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='First Name' name="firstName" type="text"/>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Last Name' name="lastName" type="text"/>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Create a Username' name="username" type="text"/>
            </Fragment>
            )}
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Email' name="email" type="text"/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name="password"
              type='password'
            />
            <br/>
            <Button color='vk' fluid size='large'>
            {displayName}
            </Button>
            <br/>
            <Button as={Link} to="/auth/google" color='google plus' fluid size='large'>
            <Icon name='google'/>
            {displayName} with Google</Button>
          </Segment>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
        {isSignup? (
        <Message>
          <Header as='h4'>Already have an account?
          <br/><br/>
        <Link to='login'><Button color='vk' content='Log In'/></Link>
        </Header>
        </Message>) : (
        <Message>
          <Header as='h4'>First time?<br/><br/>
        <Link to='signup'><Button color='vk' content="Sign Up"/></Link>
        </Header>
        </Message>)}
      </Grid.Column>
    </Grid>
  </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
