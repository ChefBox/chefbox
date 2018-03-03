'use strict';

import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { removeProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductItem extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    render(){
        const product = this.props.product
        return (
            <div>
                <Link to={`/products/${product.id}`}>
                    <img src={product.productImages[0].imageUrl} />
                    <h3>{product.name}</h3>
                    <p>Ingredients: {product.ingredients}</p>
                </Link>
                <button onClick={this.handleClick} >Delete</button>
            </div>
        )
    }

    handleClick(event){
        event.preventDefault()
        const { removeProduct, product } = this.props
        removeProduct(product.id)
    }
}

/**
 * CONTAINER
 */
const mapState = null

const mapDispatch = dispatch => ({
    removeProduct: id => dispatch(removeProduct(id))
})

export default connect(mapState, mapDispatch)(ProductItem)
