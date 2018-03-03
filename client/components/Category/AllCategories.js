import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/categories';




class AllCategories extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeCategory: null
        }
        this.handleClick = this.handleClick.bind(this)
        
    }

    handleClick(event){
        //console.log(this.event.target.key)
        this.setState({
            activeCategory: event.target.key
        })
    }

    componentDidMount(){
        this.props.fetchCategories()
    }

    render(){
        //const category = this.props.categories
        console.log('rendered!')
        console.log('this.props.categories: ', this.props.categories);
        return (
            <div>
                {
                    this.props.categories === undefined ?
                    <div /> : (
                 <div>
                     <div onClick = {this.handleClick}>
                     {this.props.categories.map((category)=>
                     <div key= {`${category.id}`}> {category.name + ' (' + category.description + ')'}</div>
                )}
                </div>
                </div>
                    )
                }
            </div>
        )
    }
}

const mapState = ({categories, products}) => ({categories, products})
const mapDispatch = {fetchCategories}
const comp = connect(mapState, mapDispatch)(AllCategories)
console.log('comp: ', comp);

export default comp
