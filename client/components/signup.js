import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

/**
 * COMPONENT
 */
const ZIP_PATTERN = '^([0-9]){5}(([ ]|[-])?([0-9]){4})?$'
const passwordLength = 3
const InputGroup = (props) => (
  <div>
  {props.invalid ? <small>{props.invalid}</small> : null}
  <label htmlFor={props.id}>{props.title + ': '}
    <input
      id={props.id}
      name={props.id}
      type={props.type}
      onChange={props.changeHandler}
      value={props.value}
      minLength={props.minLength ? props.minLength : '0'}
      required
      autoComplete="off"
      pattern={props.pattern}
      placeholder={props.placeholder}
    />
  </label>
  </div>
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
      emailChanged: false,
      lastNameChanged: false,
      firstNameChanged: false,
      passwordChanged: false,
      addressChanged: false,
      cityChanged: false,
      stateChanged: false,
      zipChanged: false,
      emailIsValid: false,
      lastNameIsValid: false,
      firstNameIsValid: false,
      passwordIsValid: false,
      addressIsValid: false,
      cityIsValid: false,
      stateIsValid: false,
      zipIsValid: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault()

    this.props.auth({
      email: this.state.email,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      password: this.state.password,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }, 'signup')
  }
  /* eslint-disable complexity */
  handleChange(evt){
    const name = evt.target.name
    const value = evt.target.value
    let isValid = false

    switch (name) {
      case 'lastName':
      case 'firstName':
      case 'address':
      case 'city':
      case 'state':
        isValid = !!value.length
        break
      case 'password':
        isValid = value.length >= passwordLength
        break
      case 'email':
        isValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        break
      case 'zip':
        isValid = RegExp(ZIP_PATTERN).test(value)
        break
      default:
        isValid = false
        break
    }
    this.setState(
      {
        [name]: value,
        [name + 'Changed']: true,
        [name + 'IsValid']: isValid,
      }
    )
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
              <div>
                <InputGroup
                  id={'firstName'}
                  type={'text'}
                  title={'First Name'}
                  changeHandler={this.handleChange}
                  value={this.state.firstName}
                  invalid={ this.state.firstNameChanged && !this.state.firstNameIsValid ? 'Please enter a first name' : ''}
                />
                <InputGroup
                  id={'lastName'}
                  type={'text'}
                  title={'Last Name'}
                  changeHandler={this.handleChange}
                  value={this.state.lastName}
                  invalid={ this.state.lastNameChanged && !this.state.lastNameIsValid ? 'Please enter a last name' : ''}
                />
                <InputGroup
                  id={'password'}
                  type={'password'}
                  title={'Password'}
                  changeHandler={this.handleChange}
                  value={this.state.password}
                  invalid={ this.state.passwordChanged && !this.state.passwordIsValid ? `Please enter a password longer than ${passwordLength} characters` : ''}
                  minLength={passwordLength}
                />
                <InputGroup
                  id={'email'}
                  type={'email'}
                  title={'Email Address'}
                  changeHandler={this.handleChange}
                  value={this.state.email}
                  invalid={ this.state.emailChanged && !this.state.emailIsValid ? 'Please enter a valid email address' : ''}
                />
                <InputGroup
                  id={'address'}
                  type={'text'}
                  title={'Address'}
                  changeHandler={this.handleChange}
                  invalid={ this.state.addressChanged && !this.state.addressIsValid ? 'Please enter an address ' : ''}
                  value={this.state.address}
                />
                <InputGroup
                  id={'city'}
                  type={'text'}
                  title={'City'}
                  changeHandler={this.handleChange}
                  value={this.state.city}
                  invalid={ this.state.cityChanged && !this.state.cityIsValid ? 'Please enter a city ' : ''}
                />
                <InputGroup
                  id={'state'}
                  type={'text'}
                  title={'State'}
                  changeHandler={this.handleChange}
                  invalid={ this.state.stateChanged && !this.state.stateIsValid ? 'Please enter a state ' : ''}
                  value={this.state.state}
                />
                <InputGroup
                  id={'zip'}
                  type={'text'}
                  title={'Zip'}
                  changeHandler={this.handleChange}
                  invalid={ this.state.zipChanged && !this.state.zipIsValid ? 'Please enter a valid zip (12345 or 12345-1456)' : ''}
                  value={this.state.zip}
                  pattern={ZIP_PATTERN}
                  placeholder="12345 or 12345-1456"
                />
              </div>
              <input type="submit" />
          </fieldset>
        </form>
      </div>
    )
  }
}
/* eslint-enable */
const mapSignup = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = {auth}

export default connect(mapSignup, mapDispatch)(Signup)

