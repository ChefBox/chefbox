import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';


class AllCategories extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.categories)
        return(
            <div>

            </div>
        )
    }
}

const mapState = ({categories}) => ({categories})

export default connect(mapState)(AllCategories)