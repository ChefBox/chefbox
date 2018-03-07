import React from 'react'
import { connect } from 'react-redux'
import { queryProducts } from '../store';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const searchTerm = evt.target.search.value
    this.props.queryProducts(searchTerm)
  }

  render() {
    return (
    <div className="search-box">
    <form onSubmit={this.handleSubmit}>
    <div className="fas fa-search" />
      <input name="search" id="search-field" >
      </input>
      <button type="submit">Search</button>
    </form>
    </div>
    )
  }
}


const mapDispatch = (dispatch) => (
  {
    queryProducts: term => dispatch(queryProducts(term))
  })

export default connect(null, mapDispatch)(Search)
