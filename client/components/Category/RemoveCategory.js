import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { removeCategory, fetchCategories } from '../../store'


class RemoveCategory extends React.Component{
    constructor(props){
        super(props)
        this.handleClick= this.handleClick.bind(this)
    }
    handleClick(event){
        event.preventDefault()
        const {removeCategory, categories} = this.props
        removeCategory(event.target.value)
    }
    componentDidMount(){
        this.props.fetchCategories()
    }

    render(){
        console.log(this.props)
        const categories = this.props.categories
        return (
            <div>
                {categories.map((singleCategory) =>
                (<li key= {singleCategory.id} > {singleCategory.name}
                <button
                value = {singleCategory.id}
                id = "RemoveButton"
                onClick= {this.handleClick} 
                disabled = {!!singleCategory.products.length}>
                 Remove Category </button>
                 {singleCategory.products.count ?
                 'Cannot delete a category with products' :
                 null}
                </li>)
                )}
                }
            </div>
        )
    }
}


const mapState = ({categories}) => ({categories});

const mapDispatch = dispatch => ({
    removeCategory: id => dispatch(removeCategory(id)),
    fetchCategories: () => dispatch(fetchCategories())
})


export default connect(mapState, mapDispatch)(RemoveCategory)
