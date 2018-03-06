import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8080' : 'https://chef-box.herokuapp.com'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="header">
    <Link to="/">
      <div id="logo-container" >
        <img id="logo" src={baseUrl + '/chefbox-logo.png'} />
        <h1>ChefBox</h1>
      </div>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="login-container">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div className="login-container" >
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      <div id="cart-container">
        <Link to="/checkout"><div className="fas fa-shopping-cart" /></Link>
      </div>
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
