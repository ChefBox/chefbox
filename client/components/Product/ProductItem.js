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
        this.removeProductCallback = this.removeProductCallback.bind(this)
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
                {
                    this.props.isAdmin !== 'admin' ?
                    null : <button onClick={this.removeProductCallback} >Delete</button>
                }
            </div>
        )
    }

    removeProductCallback(event){
        event.preventDefault()
        const { removeProduct, product } = this.props
        removeProduct(product.id)
    }
}

/**
 * CONTAINER
 */
const mapState = ({ user }) => {
    const isAdmin = !!user ? user.role : null
    return { isAdmin }
}

const mapDispatch = dispatch => ({
    removeProduct: ProductId => dispatch(removeProduct(ProductId))
})

export default connect(mapState, mapDispatch)(ProductItem)
