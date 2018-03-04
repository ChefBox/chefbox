import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */

const InputGroup = (props) => (
  <label htmlFor={props.id}>{props.title + ': '}
    <input
      id={props.id}
      name={props.id}
      type={props.type}
      onChange={props.changeHandler}
      value={props.value}
    />
  </label>
)

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      lastName: '',
      firstName: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit(evt) {
    evt.preventDefault()

    this.props.auth(this.state, 'signup')
  }
  render(){
    const error = this.props.error
    return (
      <div>
      <a href="/auth/google">Signup with Google</a>
      {error && error.response && <div> {error.response.data} </div>}
        <form onSubmit={this.handleSubmit}>
          <fieldset>
              <legend>Sign Up</legend>

              <InputGroup
                id={'firstName'}
                type={'text'}
                title={'First Name'}
                changeHandler={this.handleChange}
                value={this.state.firstName}
              />
              <InputGroup
                id={'lastName'}
                type={'text'}
                title={'Last Name'}
                changeHandler={this.handleChange}
                value={this.state.lastName}
              />
              <InputGroup
                id={'password'}
                type={'password'}
                title={'Password'}
                changeHandler={this.handleChange}
                value={this.state.password}
              />
              <InputGroup
                id={'email'}
                type={'email'}
                title={'Email Address'}
                changeHandler={this.handleChange}
                value={this.state.email}
              />
              <InputGroup
                id={'address'}
                type={'text'}
                title={'Address'}
                changeHandler={this.handleChange}
                value={this.state.address}
              />
              <InputGroup
                id={'city'}
                type={'text'}
                title={'City'}
                changeHandler={this.handleChange}
                value={this.state.city}
              />
              <InputGroup
                id={'state'}
                type={'text'}
                title={'State'}
                changeHandler={this.handleChange}
                value={this.state.state}
              />
              <InputGroup
                id={'zip'}
                type={'text'}
                title={'Zip'}
                changeHandler={this.handleChange}
                value={this.state.zip}
              />

              <input type="submit" />
          </fieldset>
        </form>
      </div>
    )
  }
}

const mapSignup = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = {auth}

export default connect(mapSignup, mapDispatch)(Signup)

