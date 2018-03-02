import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';



class AllCategories extends React.Component {
    constructor(props){
        super(props)
        this.state= [
            activeCategory = null
        ]
    }

    handleClick(event){
        console.log(this.event.target.key)
        this.state.setState({
            activeCategory: this.event.target.key
        })
    }

    render(){
        categories = this.props.categories
        return(
            <div>
                {
                    this.props.categories === undefined ?
                    <div /> : (
                 <div>
                     {this.props.categories.map((category)=>
                     <div key= "category.id"> {category.name + " " +  }</div>
                )}
                </div>
                    )
                }
            </div>
        )
    }
}

const mapState = ({categories, products}) => ({categories, products})

export default connect(mapState)(AllCategories)