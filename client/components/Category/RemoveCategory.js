import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCategory, fetchCategories } from '../../store'


class RemoveCategory extends React.Component{
    constructor(props){
        super(props)
        this.handleClick= this.handleClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchCategories()
    }

    handleClick(event){
        event.preventDefault()
        const {removeCategory, categories} = this.props
        removeCategory(+event.target.value)
    }

    render(){
        const categories = this.props.categories
        return (
            <div>
                <h1> Remove a Category </h1>
                {categories.map((singleCategory) =>
                (<li key= {singleCategory.id} > {singleCategory.name}
                {/* <Link to= '/' > */}
                <button
                value = {singleCategory.id}
                id = "RemoveButton"
                onClick= {this.handleClick} 
                disabled = {!!singleCategory.products.length}>
                 Remove Category </button>
                 {/* </Link> */}
                 {singleCategory.products.count ?
                 'Cannot delete a category with products' :
                 null}
                </li>)
                )}
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
