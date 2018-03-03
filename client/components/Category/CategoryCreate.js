import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { addCategory } from '../../store'


class createCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: ''
        }
    }

    handleSubmit(event){
        event.preventDefault()
        const {addCategory} = this.props
        addCategory(this.state)
    }


    render(){
        return(
            <div>
                <form>
                    <h3>
                        Category Name
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
                        Category description
                        <input
                            onChange= {event =>
                            this.setState({description: event.target.value})}
                            name = "description"
                            required
                            placeholder = "Description name"
                            />
                    </h3>
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


export default connect(mapState, mapDispatch)(createCategory)
