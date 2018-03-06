import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart, CategoryCreate, RemoveCategory, EditCategories} from './components'
import {ProductReview, ProductDetail, ProductEdit, ProductCreate, ProductList} from './components'
import {me, fetchCategories, fetchProducts, fetchCart, fetchReviews} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/categories/:categoryName" render={
          ({match: {params: {categoryName}}}) =>
            <ProductList categoryName={categoryName} />
        } />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={Cart} />
        <Route exact path="/products/:productId" component={ProductDetail} />
        <Route path="/products/:productId/reviews" component={ProductReview} />
        <Route exact path= "/editcategory/:id" component = {EditCategories} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/addcategory" component={CategoryCreate} />
              <Route path="/editcategory" component={EditCategories} />
              <Route path="/removecategory" component={RemoveCategory} />
              <Route exact path="/products/admin/create" component={ProductCreate} />
              <Route exact path="/products/:productId/admin/edit" component={ProductEdit} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
      dispatch(fetchCart())
      dispatch(fetchReviews())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
