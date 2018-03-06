import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { editCategory } from '../../store/';

class AllCategories extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
        
    }

    handleClick(event){
        event.preventDefault()
        const { editCategory, categories } = this.props
        categories.map((category) => {
            if(category.name === event.target.value){
                editCategory({active: true}, category.id)
            } else {
                editCategory({active: false}, category.id)
            }
        })
    }


    render(){

        return (
            <div>
                <h1> Categories </h1>
                {
                    this.props.categories === undefined ?
                    <div /> : (
                 <div>
                     {this.props.categories.map((category) =>
                     <div onClick={this.handleClick} key= {category.id}> {`${category.name}`}
                     <Link to= {`/categories/${category.name}`} ><button> Category View </button></Link>
                     <Link to= {`/editcategory/${category.id}`} ><button> Edit </button ></Link >
                     </div>
                )}
                <div><Link to = {'/addcategory'}> <button> Add a Category </button> </Link> </div>
                <div> <Link to = {'/'}><button> All Products </button> </Link></div>
                <Link to= {'/removecategory'}> <button> Remove Categories </button> </Link >
                </div>
                    )
                }
            </div>
        )
    }
}

const mapState = ({categories, products}) => ({categories, products})

export default connect(mapState)(AllCategories)
