import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { addCategory } from '../../store'


class CreateCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault()
        const {addCategory, history} = this.props
        addCategory(this.state)
        history.push('/products/admin/create')
    }


    render(){
        return (
            <div>
                <form onSubmit= {this.handleSubmit}>
                    <h3>
                        Category Name
                        {'  '}
                        <input 
                        onChange = {event =>
                        this.setState({name: event.target.value})
                    }
                    name = "name"
                    required
                    placeholder= "Category name"
                    />
                    </h3>
                    <h3>
                        Category Description
                        {'  '}
                        <input
                            onChange= {event =>
                            this.setState({description: event.target.value})}
                            name = "description"
                            required
                            placeholder = "Description name"
                            />
                    </h3>
                    <button> Submit Category </button>
                </form>
            </div>
        )
    }
}

const mapState = null

const mapDispatch = (dispatch, ownProps) => ({
    addCategory: (category) =>
        dispatch(addCategory(category, ownProps.history))
})


export default connect(mapState, mapDispatch)(CreateCategory)
