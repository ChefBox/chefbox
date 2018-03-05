'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { editCategory } from '../../store';

class EditCategories extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      description: this.props.category.description,
      name: this.props.category.name,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      description: nextProps.category.description ? nextProps.category.description : '',
      name: nextProps.category.name ? nextProps.category.name : '',
    })
  }
  handleChange(event){
    const name = event.target.name
    const value = event.target.value
    this.setState(
      {
        [name]: value,
      }
    )
  }
  handleSubmit(event) {
    event.preventDefault();
    const category = this.state
    const id = this.props.match.params.id

    // debugger
    this.props.editCategory(category, id);
    this.props.history.push(`/`); //improper place as per aaron, should be inside of the thunk after successfull update
  }

  render() {
    const category = this.props.category
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> {category.name} </h4>
        <h3>
          Category Name
          <input
            onChange={this.handleChange}
            name="name"
            required
            value={this.state.name}
          />
        </h3>
        <h3>
          Category Description
          <textarea
            onChange={this.handleChange}
            name="description"
            required
            value={this.state.description}
          />
        </h3>
        <button> Submit Changes </button>
      </form>
    );
  }
}


const mapState = ({ categories }, ownProps) => {
  const [catTemp] = categories.filter(cat => {
    return cat.id === +ownProps.match.params.id;
  });
  const category = catTemp ? catTemp : {}
  return { category, categories };
};

const mapDispatch = dispatch => ({
  editCategory: (category, id) => dispatch(editCategory(category, id))
});

export default connect(mapState, mapDispatch)(EditCategories);
