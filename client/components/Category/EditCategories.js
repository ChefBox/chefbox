'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


class EditCategories extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: props.catogories
        }
    }

    handleSubmit(){

    }

    render(){
        const categories = this.props.categories
        return(
            <form onSubmit= {handleSubmit}>
                <h3>
                        Category Name
                        <input
                            onChange={event =>
                                this.categoryUpdate({ name: event.target.value })
                            }
                            name="name"
                            required
                            value={categories === undefined ? '' : categories.name}
                        />
                    </h3>

            </form>
        )
    }
    categoryUpdate(categoryUpdateObj) {
        this.setState({
            category: Object.assign({}, this.state.category, categoryUpdateObj)
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const { editCategory } = this.props
        const { category } = this.state
        editCategory(category, category.id)
        this.props.history.push(`/categories/${category.id}`)
    }
}




