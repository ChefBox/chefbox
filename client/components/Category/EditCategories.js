'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editCategory} from '../../store'


class EditCategories extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: props.categories
        }
        this.categoryUpdate = this.categoryUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    categoryUpdate(categoryUpdateObj) {
        this.setState(prevState => ({
            category: Object.assign(prevState, prevState.category, categoryUpdateObj)
        }))
    }


    handleChange(event){
        // this.categoryUpdate({ name: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        const { editCategory } = this.props
        const { category } = this.state
        editCategory(category, category.id)
        this.props.history.push(`/categories/${category.id}`)
    }

    render(){
        const categories = this.props.categories
        return (
            <form onSubmit= {this.handleSubmit}>
                <h3>
                        Category Name
                        <input
                            onChange={this.handleChange( event.target.name )
                            }
                            name="name"
                            required
                            value={categories === undefined ? null : categories.name}
                        />
                    </h3>
                    <h3>
                            Category Description
                            <textarea
                                onChange = {this.handleChange(event.target.name)}
                                name = "description"
                                required
                                value = {categories === undefined ? null : categories.description}
                                />
                    </h3>
                    <button> Submit Changes </button>
            </form>
        )
    }

}

const mapState = ({categories}) => ({categories});

const mapDispatch = dispatch => ({
    editCategory: (category, id) => dispatch(editCategory(category, id))
})

export default connect(mapState, mapDispatch)(EditCategories)